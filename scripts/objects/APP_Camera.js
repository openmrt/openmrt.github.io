///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Camera.js

/*
 * This class encapsulates the camera related classes and enables easy access and
 * initialization.
 */
class APP_Camera{

	constructor(fov, aspect, near, far, pos, lookAt){

		this.m_THR_camera;
		this.m_CameraControls;

		this.init(fov, aspect, near, far, pos, lookAt);

	}

	init(fov, aspect, near, far, pos, lookAt){

		this.m_THR_camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.m_THR_camera.position.set(pos.x, pos.y, pos.z);
        this.m_THR_camera.lookAt(lookAt);

		this.m_CameraControls = new APP_CameraControls(this.m_THR_camera);

	}

	getTHRCamera(){
		return this.m_THR_camera;
	}

	update(){
		this.m_CameraControls.update();
	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
