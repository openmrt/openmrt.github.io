///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Renderer.js

/*
 * This class serves as an easy interface to all rendering functions. It keeps track
 * of the state of the canvas and handles the draw calls.
 */
class APP_Renderer{

    constructor(canvasID, width, height, camera){

        this.m_THR_renderer;
		this.m_THR_scene;

		this.m_camera;
		this.m_sceneObjects;

		this.m_shadowMap = 0;

        this.init(canvasID, width, height, camera);

    }

	init(canvasID, width, height, camera){

		var canvas = document.getElementById(canvasID);
        this.m_THR_renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, preserveDrawingBuffer: true});
        this.m_THR_renderer.autoClear = true;
        this.m_THR_renderer.setClearColor("#fff", 1);
        this.m_THR_renderer.setSize(width, height);
        this.m_THR_scene = new THREE.Scene();

		this.m_camera 		= camera;
		this.m_sceneObjects = [];

	}

	addSceneObject(mesh){
		mesh.addToScene(this.m_THR_scene);
		this.m_sceneObjects.push(mesh);
	}

	clearSceneObjects(){

		for(var i = 0; i < this.m_sceneObjects.length; i++){
			this.m_sceneObjects[i].removeFromScene(this.m_THR_scene);
			this.m_sceneObjects[i].dispose();
		}

		this.m_sceneObjects = [];

	}

	setShader(shaderID){

		for(var i = 0; i < this.m_sceneObjects.length; i++){

			if(this.m_sceneObjects[i].getShaderID() != APP_GlobalData.SHADER_ID_SUN){
				this.m_sceneObjects[i].setShader(shaderID);
			}

		}

	}

    getWidth(){
        return this.m_THR_renderer.getSize().width;
    }

    getHeight(){
        return this.m_THR_renderer.getSize().height;
    }

    clear(){
        this.m_THR_renderer.clear();
    }

	getRenderBufferAsDOMImage(){
		return this.m_THR_renderer.domElement.toDataURL("image/png");
	}

	invalidateShadowMap(){

		if(this.m_shadowMap != 0){

			this.m_shadowMap[0].dispose();
			this.m_shadowMap = 0;

		}

	}

	render(){

		this.m_camera.update();

		if(APP_GlobalData.display == APP_GlobalData.DISPLAY_MESH){

			if(this.m_shadowMap == 0){
				var shadowMapAndCam = this.renderShadowMap(APP_GlobalData.SHADOWMAP_WIDTH, APP_GlobalData.SHADOWMAP_HEIGHT, APP_GlobalData.sun.getPosition().clone().multiplyScalar((1/13) * 10));
				this.m_shadowMap = shadowMapAndCam;
			}

			for(var i = 0; i < this.m_sceneObjects.length; i++){
				this.m_sceneObjects[i].updateUniforms(this.m_shadowMap[0].texture, this.m_shadowMap[1].matrixWorldInverse, this.m_shadowMap[1].projectionMatrix);
			}

			this.m_THR_renderer.render(this.m_THR_scene, this.m_camera.getTHRCamera());

		}else if(APP_GlobalData.display == APP_GlobalData.DISPLAY_SHADOWMAP){

			var lightPosition = APP_GlobalData.sun.getPosition().clone().multiplyScalar((1/13) * 10);
			var orthoCam = new THREE.OrthographicCamera(-3, 3, 3, -3, 1, 20);
			orthoCam.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
			orthoCam.lookAt(new THREE.Vector3(0,0,0));
			orthoCam.updateMatrix();
			orthoCam.updateProjectionMatrix();

			this.m_THR_renderer.render(this.m_THR_scene, orthoCam);

		}

	}

	renderToTarget(targetWidth, targetHeight, camera){

        var thr_renderTarget = new THREE.WebGLRenderTarget(targetWidth, targetHeight,{
            minFilter:  THREE.LinearFilter,
            magFilter:  THREE.LinearFilter,
            format:     THREE.RGBAFormat,
            type:       THREE.UnsignedByteType
        });

        APP_GlobalData.renderer.m_THR_renderer.clearTarget(thr_renderTarget, 1, 1, 1);
        this.m_THR_renderer.render(this.m_THR_scene, this.m_camera.getTHRCamera(), thr_renderTarget, false);

        return thr_renderTarget;

    }

	renderShadowMap(targetWidth, targetHeight, lightPosition){

		//save shaders so that they can be restored
		var tmpShader = [];
		for(var i = 0; i < this.m_sceneObjects.length; i++){
			tmpShader.push(this.m_sceneObjects[i].getShaderID());
		}

		//set shadow shader
		this.setShader(APP_GlobalData.SHADER_ID_SHADOWMAP);

		//create orthographic camera for parallel light
		var orthoCam = new THREE.OrthographicCamera(-3, 3, 3, -3, 1, 20);
		orthoCam.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
		orthoCam.lookAt(new THREE.Vector3(0,0,0));
		orthoCam.updateMatrix();
		orthoCam.updateProjectionMatrix();

		//create rendertarget (float type for greater precision)
		var shadowMap = new THREE.WebGLRenderTarget(targetWidth, targetHeight,{
            minFilter:  THREE.LinearFilter,
            magFilter:  THREE.LinearFilter,
            format:     THREE.RGBAFormat,
            type:       THREE.FloatType
        });

		//actual rendering
        APP_GlobalData.renderer.m_THR_renderer.clearTarget(shadowMap, 1, 1, 1);
        this.m_THR_renderer.render(this.m_THR_scene, orthoCam, shadowMap, false);

		//reset shader
		for(var i = 0; i < this.m_sceneObjects.length; i++){
			this.m_sceneObjects[i].setShader(tmpShader[i]);
		}

		return [shadowMap, orthoCam];

	}

	renderUVExport(targetWidth, targetHeight){

		var renderTargets = [];

		//createShadowMap if one is not already there
		if(this.m_shadowMap == 0){
			var shadowMapAndCam = this.renderShadowMap(APP_GlobalData.SHADOWMAP_WIDTH, APP_GlobalData.SHADOWMAP_HEIGHT, APP_GlobalData.sun.getPosition().clone().multiplyScalar((1/13) * 10));
			this.m_shadowMap = shadowMapAndCam;
		}

		//remove all meshes from the scene
		for(var i = 0; i < this.m_sceneObjects.length; i++){
			this.m_sceneObjects[i].removeFromScene(this.m_THR_scene);
		}

		//create for each scene object (face of the cube) a rendertarget
		for(var i = 0; i < this.m_sceneObjects.length; i++){

			//skip the sun
			if(this.m_sceneObjects[i].getShaderID() == APP_GlobalData.SHADER_ID_SUN){
				continue;
			}

			//switch shaders and add to scene
			var tmpShader = this.m_sceneObjects[i].getShaderID();
			this.m_sceneObjects[i].setShader(APP_GlobalData.SHADER_ID_UV_SHADOW);
			this.m_sceneObjects[i].addToScene(this.m_THR_scene);

			//update uniforms
			this.m_sceneObjects[i].updateUniforms(this.m_shadowMap[0].texture, this.m_shadowMap[1].matrixWorldInverse, this.m_shadowMap[1].projectionMatrix);

			//create rendertarget
			var thr_renderTarget = new THREE.WebGLRenderTarget(targetWidth, targetHeight,{
	            minFilter:  THREE.LinearFilter,
	            magFilter:  THREE.LinearFilter,
	            format:     THREE.RGBAFormat,
	            type:       THREE.UnsignedByteType
	        });

			//render
	        APP_GlobalData.renderer.m_THR_renderer.clearTarget(thr_renderTarget, 1, 1, 1);
	        this.m_THR_renderer.render(this.m_THR_scene, this.m_camera.getTHRCamera(), thr_renderTarget, false);
			renderTargets.push(thr_renderTarget);

			//restore shader and remove from scene
			this.m_sceneObjects[i].setShader(tmpShader);
			this.m_sceneObjects[i].removeFromScene(this.m_THR_scene);

		}

		//add all meshes back to the scene
		for(var i = 0; i < this.m_sceneObjects.length; i++){
			this.m_sceneObjects[i].addToScene(this.m_THR_scene);
		}

		return renderTargets;

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
