///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_InputDeviceHandler.js

/*
 * This class handles the input of the canvas and provides basic user input
 * information for other classes.
 */
class APP_InputDeviceHandler{

	static noticeKeyDown(evt){

		if(evt.keyCode == 87){
			APP_InputDeviceHandler.key_W = true;
		}
		if(evt.keyCode == 65){
			APP_InputDeviceHandler.key_A = true;
		}
		if(evt.keyCode == 83){
			APP_InputDeviceHandler.key_S = true;
		}
		if(evt.keyCode == 68){
			APP_InputDeviceHandler.key_D = true;
		}
		if(evt.keyCode == 16){
			APP_InputDeviceHandler.key_SHIFT = true;
		}
		if(evt.keyCode == 17){
			APP_InputDeviceHandler.key_CTRL = true;
		}
		if(evt.keyCode == 32){
			APP_InputDeviceHandler.key_SPACE = true;
		}
		if(evt.keyCode == 67){
			APP_InputDeviceHandler.key_C = true;
		}
		evt.preventDefault();
		evt.stopPropagation();
	}

	static noticeKeyUp(evt){

		if(evt.keyCode == 87){
			APP_InputDeviceHandler.key_W = false;
		}
		if(evt.keyCode == 65){
			APP_InputDeviceHandler.key_A = false;
		}
		if(evt.keyCode == 83){
			APP_InputDeviceHandler.key_S = false;
		}
		if(evt.keyCode == 68){
			APP_InputDeviceHandler.key_D = false;
		}
		if(evt.keyCode == 16){
			APP_InputDeviceHandler.key_SHIFT = false;
		}
		if(evt.keyCode == 17){
			APP_InputDeviceHandler.key_CTRL = false;
		}
		if(evt.keyCode == 32){
			APP_InputDeviceHandler.key_SPACE = false;
		}
		if(evt.keyCode == 67){
			APP_InputDeviceHandler.key_C = false;
		}

	}

	static noticeMouseButtonDown(evt){

		var element = document.getElementById("CANVAS");
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();

	}

	static noticeMouseMove(evt){
		APP_InputDeviceHandler.mouseDeltaX = evt.movementX;
		APP_InputDeviceHandler.mouseDeltaY = evt.movementY;
	}

	static resetMouseDelta(){
		APP_InputDeviceHandler.mouseDeltaX = 0;
		APP_InputDeviceHandler.mouseDeltaY = 0;
	}

	static noticeMouseWheel(evt){

		var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
		APP_GlobalData.CAMERA_MOVEMENT_SPEED += delta / 1000;

	}

	static noticePointerCatch(evt){

		var canvas = document.getElementById("CANVAS");
		if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas){
			document.addEventListener('mousemove', APP_InputDeviceHandler.noticeMouseMove, false);
			document.addEventListener('keydown', APP_InputDeviceHandler.noticeKeyDown);
			document.addEventListener('keyup', APP_InputDeviceHandler.noticeKeyUp);
			document.addEventListener('mousewheel', APP_InputDeviceHandler.noticeMouseWheel, false);
			document.addEventListener('DOMMouseScroll', APP_InputDeviceHandler.noticeMouseWheel, false);
		}else{
			document.removeEventListener("mousemove", APP_InputDeviceHandler.noticeMouseMove, false);
			document.removeEventListener('keydown', APP_InputDeviceHandler.noticeKeyDown);
			document.removeEventListener('keyup', APP_InputDeviceHandler.noticeKeyUp);
			document.removeEventListener('mousewheel', APP_InputDeviceHandler.noticeMouseWheel, false);
			document.removeEventListener('DOMMouseScroll', APP_InputDeviceHandler.noticeMouseWheel, false);
		}

	}

}

APP_InputDeviceHandler.key_W = false;
APP_InputDeviceHandler.key_A = false;
APP_InputDeviceHandler.key_S = false;
APP_InputDeviceHandler.key_D = false;
APP_InputDeviceHandler.key_SHIFT = false;
APP_InputDeviceHandler.key_CTRL = false;
APP_InputDeviceHandler.key_SPACE = false;
APP_InputDeviceHandler.key_C = false;

APP_InputDeviceHandler.mouseDeltaX = 0;
APP_InputDeviceHandler.mouseDeltaY = 0;

//
///////////////////////////////////////////////////////////////////////////////////////////////////
