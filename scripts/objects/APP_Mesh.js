///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Mesh.js

/*
 * This class extracts the information about meshes (vertices etc.) into a seperate class
 * and allow easier access.
 */
class APP_Mesh{

	constructor(mesh, shaderID, texImage = 0){

		this.m_THR_mesh = mesh;
		this.m_shaderID = shaderID;

		if(texImage != 0){
			this.m_texImage = texImage.toRGBATexture();
		}

		this.setShader(this.m_shaderID);

	}

	static fromMeshData(meshData){

		APP_Geometry.multiply(meshData, 0.5);
		var geometry = APP_Geometry.toTHRGeometry(meshData);

		var thrMesh = new THREE.Mesh(geometry, 0);
		thrMesh.position.set(0, 11, 0);

		return new APP_Mesh(thrMesh, APP_GlobalData.SHADER_ID_SUN, 0);

	}

	static fromArrays(vertices, indices, texCoords, segColors, normals, distances, depthDistances, texImage){

		assert((vertices.length/3) == (texCoords.length/2))
		assert(vertices.length == segColors.length);
		assert((vertices.length/3) == (distances.length/4));
		assert(vertices.length == normals.length);

		var positionArray 	= APP_Util.convertToFloat32Array(vertices);
		var texCoordArray	= APP_Util.convertToFloat32Array(texCoords);
		var distanceArray	= APP_Util.convertToFloat32Array(distances);
		var segColorArray	= APP_Util.convertToFloat32Array(segColors);
		var normalArray 	= APP_Util.convertToFloat32Array(normals);
		var ddArray			= APP_Util.convertToFloat32Array(depthDistances);

		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute("position", new THREE.BufferAttribute(positionArray, 3));
		geometry.addAttribute("texCoord", new THREE.BufferAttribute(texCoordArray, 2));
		geometry.addAttribute("distance", new THREE.BufferAttribute(distanceArray, 4));
		geometry.addAttribute("segColor", new THREE.BufferAttribute(segColorArray, 3));
		geometry.addAttribute("normal", new THREE.BufferAttribute(normalArray, 3));
		geometry.addAttribute("depthDistance", new THREE.BufferAttribute(ddArray, 4));
		geometry.setIndex(indices);

		var thrMesh = new THREE.Mesh(geometry, 0);
		return new APP_Mesh(thrMesh, APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW, texImage);

	}

	setShader(shaderID){

		this.m_shaderID = shaderID;

		switch(shaderID){

			case APP_GlobalData.SHADER_ID_SHADOWMAP:{

				var newMaterial = new THREE.RawShaderMaterial(
				{
					uniforms: {
						TDT: 			{value: APP_GlobalData.TDT},
						DDT: 			{value: APP_GlobalData.DDT}
					},
					side: THREE.DoubleSide,
					vertexShader: document.getElementById("vertexShader_SHADOWMAP").textContent,
					fragmentShader: document.getElementById("fragmentShader_SHADOWMAP").textContent,
				});

				var oldMaterial = this.m_THR_mesh.material;
				this.m_THR_mesh.material = newMaterial;
				if(oldMaterial != 0){
					oldMaterial.dispose();
				}

			}break;

			case APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW:{

				var newMaterial = new THREE.RawShaderMaterial(
				{
					uniforms: {
						TDT: 						{value: APP_GlobalData.TDT},
						DDT: 						{value: APP_GlobalData.DDT},
						interpFacSeg: 				{value: APP_GlobalData.interpFacSeg},
						shadowMap:					{value: 0},
						texImage:					{value: 0},
						shadowModelViewMatrix: 		{value: 0},
						shadowProjectionMatrix: 	{value: 0},
						lightDirection:				{value: APP_GlobalData.sun.getPosition().clone().multiplyScalar(-1)},
						interpFacDif:				{value: APP_GlobalData.interpFacDif},
						interpFacSdw:				{value: APP_GlobalData.interpFacSdw}
					},
					side: THREE.DoubleSide,
					vertexShader: document.getElementById("vertexShader_TRIANGLES_SHADOW").textContent,
					fragmentShader: document.getElementById("fragmentShader_TRIANGLES_SHADOW").textContent,
				});

				var oldMaterial = this.m_THR_mesh.material;
				this.m_THR_mesh.material = newMaterial;
				if(oldMaterial != 0){
					oldMaterial.dispose();
				}

			}break;

			case APP_GlobalData.SHADER_ID_SUN:{

				var newMaterial = new THREE.RawShaderMaterial(
				{
					uniforms: {},
					side: THREE.DoubleSide,
					vertexShader: document.getElementById("vertexShader_SUN").textContent,
					fragmentShader: document.getElementById("fragmentShader_SUN").textContent,
				});

				var oldMaterial = this.m_THR_mesh.material;
				this.m_THR_mesh.material = newMaterial;
				if(oldMaterial != 0){
					oldMaterial.dispose();
				}

			}break;

			case APP_GlobalData.SHADER_ID_UV_SHADOW:{

				var newMaterial = new THREE.RawShaderMaterial(
				{
					uniforms: {
						TDT: 						{value: APP_GlobalData.TDT},
						DDT: 						{value: APP_GlobalData.DDT},
						interpFacSeg: 				{value: APP_GlobalData.interpFacSeg},
						shadowMap:					{value: 0},
						texImage:					{value: 0},
						shadowModelViewMatrix: 		{value: 0},
						shadowProjectionMatrix: 	{value: 0},
						lightDirection:				{value: APP_GlobalData.sun.getPosition().clone().multiplyScalar(-1)},
						interpFacDif:				{value: APP_GlobalData.interpFacDif},
						interpFacSdw:				{value: APP_GlobalData.interpFacSdw}
					},
					side: THREE.DoubleSide,
					vertexShader: document.getElementById("vertexShader_UV_SHADOW").textContent,
					fragmentShader: document.getElementById("fragmentShader_UV_SHADOW").textContent,
				});

				var oldMaterial = this.m_THR_mesh.material;
				this.m_THR_mesh.material = newMaterial;
				if(oldMaterial != 0){
					oldMaterial.dispose();
				}

			}break;

			default:{
				assert(false);
			}break;

		}

	}

	updateUniforms(shadowMap = 0, shadowModelViewMatrix = 0, shadowProjectionMatrix = 0){

		switch(this.m_shaderID){

			case APP_GlobalData.SHADER_ID_SHADOWMAP:{

				this.m_THR_mesh.material.uniforms.TDT = {value: APP_GlobalData.TDT};
				this.m_THR_mesh.material.uniforms.DDT = {value: APP_GlobalData.DDT};

			}break;

			case APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW:{

				this.m_THR_mesh.material.uniforms.TDT 						= {value: APP_GlobalData.TDT};
				this.m_THR_mesh.material.uniforms.DDT 						= {value: APP_GlobalData.DDT};
				this.m_THR_mesh.material.uniforms.interpFacSeg 				= {value: APP_GlobalData.interpFacSeg};
				this.m_THR_mesh.material.uniforms.interpFacDif 				= {value: APP_GlobalData.interpFacDif};
				this.m_THR_mesh.material.uniforms.interpFacSdw 				= {value: APP_GlobalData.interpFacSdw};
				this.m_THR_mesh.material.uniforms.lightDirection 			= {value: APP_GlobalData.sun.getPosition().clone().multiplyScalar(-1)};
				this.m_THR_mesh.material.uniforms.shadowMap 				= {value: shadowMap};
				this.m_THR_mesh.material.uniforms.texImage 					= {value: this.m_texImage};
				this.m_THR_mesh.material.uniforms.shadowModelViewMatrix 	= {value: shadowModelViewMatrix};
				this.m_THR_mesh.material.uniforms.shadowProjectionMatrix 	= {value: shadowProjectionMatrix};

			}break;

			case APP_GlobalData.SHADER_ID_SUN:{

				//has no uniforms

			}break;

			case APP_GlobalData.SHADER_ID_UV_SHADOW:{

				this.m_THR_mesh.material.uniforms.TDT 						= {value: APP_GlobalData.TDT};
				this.m_THR_mesh.material.uniforms.DDT 						= {value: APP_GlobalData.DDT};
				this.m_THR_mesh.material.uniforms.interpFacSeg 				= {value: APP_GlobalData.interpFacSeg};
				this.m_THR_mesh.material.uniforms.interpFacDif 				= {value: APP_GlobalData.interpFacDif};
				this.m_THR_mesh.material.uniforms.interpFacSdw 				= {value: APP_GlobalData.interpFacSdw};
				this.m_THR_mesh.material.uniforms.lightDirection 			= {value: APP_GlobalData.sun.getPosition().clone().multiplyScalar(-1)};
				this.m_THR_mesh.material.uniforms.shadowMap 				= {value: shadowMap};
				this.m_THR_mesh.material.uniforms.texImage 					= {value: this.m_texImage};
				this.m_THR_mesh.material.uniforms.shadowModelViewMatrix 	= {value: shadowModelViewMatrix};
				this.m_THR_mesh.material.uniforms.shadowProjectionMatrix 	= {value: shadowProjectionMatrix};

			}break;

			default:{
				//no shader currently loaded => no update needed
			}break;

		}
	}

	addToScene(scene){
		scene.add(this.m_THR_mesh);
	}

	removeFromScene(scene){
		scene.remove(this.m_THR_mesh);
	}

	dispose(){
		this.m_THR_mesh.geometry.dispose();
		this.m_THR_mesh.material.dispose();
	}

	getShaderID(){return this.m_shaderID;}
	getPosition(){return this.m_THR_mesh.position;}
	setPositionXYZ(x, y, z){this.m_THR_mesh.position.set(x,y,z);}
	setPositionVec(vec){this.m_THR_mesh.position.set(vec.x,vec.y,vec.z);}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
