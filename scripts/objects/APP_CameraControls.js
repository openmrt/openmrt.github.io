///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_CameraControls.js

/*
 * This class updates the camera based on the input of APP_InputDeviceHandler in an
 * first person like style.
 */
class APP_CameraControls{

	constructor(camera){

		this.m_THR_camera 	= camera;
		this.m_RotationX 	= 0;
		this.m_RotationY 	= 0;

	}

	update(){

		if(!APP_GlobalData.inputLocked){

			var upFactor = 0;
			var forwardFactor = 0;
			var rightFactor = 0;
			var additionalSpeed = 0;

			if(APP_InputDeviceHandler.key_W){
				forwardFactor = 1;
			}
			if(APP_InputDeviceHandler.key_S){
				forwardFactor = -1;
			}
			if(APP_InputDeviceHandler.key_A){
				rightFactor = 1;
			}
			if(APP_InputDeviceHandler.key_D){
				rightFactor = -1;
			}
			if(APP_InputDeviceHandler.key_SPACE){
				upFactor = 1;
			}
			if(APP_InputDeviceHandler.key_C){
				upFactor = -1;
			}

			//translation
			this.move(forwardFactor * APP_GlobalData.CAMERA_MOVEMENT_SPEED);
			this.strave(rightFactor * APP_GlobalData.CAMERA_MOVEMENT_SPEED);
			this.lift(upFactor * APP_GlobalData.CAMERA_MOVEMENT_SPEED);

			//rotation
			var movementX = -APP_InputDeviceHandler.mouseDeltaX * APP_GlobalData.CAMERA_ROTATION_SPEED * Math.PI / 360
			var movementY = -APP_InputDeviceHandler.mouseDeltaY * APP_GlobalData.CAMERA_ROTATION_SPEED * Math.PI / 360;
			APP_InputDeviceHandler.resetMouseDelta();
			this.rotate(movementX, movementY);

			//update
			this.updateMatices();

		}

	}

	strave(amt){

		var position = this.m_THR_camera.position;
		var rightVec = new THREE.Vector3(1, 0, 0);
		rightVec.applyQuaternion(this.m_THR_camera.quaternion);

		var newPosition = new THREE.Vector3(position.x - amt * rightVec.x,
											position.y - amt * rightVec.y,
											position.z - amt * rightVec.z);

		this.m_THR_camera.position.set(newPosition.x, newPosition.y, newPosition.z);

	}

	move(amt){

		var position = this.m_THR_camera.position;
		var forwardVec = new THREE.Vector3(0, 0, -1);
		forwardVec.applyQuaternion(this.m_THR_camera.quaternion);

		var newPosition = new THREE.Vector3(position.x + amt * forwardVec.x,
											position.y + amt * forwardVec.y,
											position.z + amt * forwardVec.z);

		this.m_THR_camera.position.set(newPosition.x, newPosition.y, newPosition.z);

	}

	lift(amt){

		var position 	= this.m_THR_camera.position;
		var upVec 		= this.m_THR_camera.up;

		var newPosition = new THREE.Vector3(position.x + amt * upVec.x,
											position.y + amt * upVec.y,
											position.z + amt * upVec.z);

		this.m_THR_camera.position.set(newPosition.x, newPosition.y, newPosition.z);

	}

	rotate(amtX, amtY){

		this.m_THR_camera.rotateX(-this.m_RotationY);
		this.m_THR_camera.rotateY(-this.m_RotationX);

		this.m_RotationX += amtX;
		this.m_RotationY += amtY;

		this.m_THR_camera.rotateY(this.m_RotationX);
		this.m_THR_camera.rotateX(this.m_RotationY);

	}

	updateMatices(){

		this.m_THR_camera.updateMatrix();

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
