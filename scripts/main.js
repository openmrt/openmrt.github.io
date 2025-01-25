///////////////////////////////////////////////////////////////////////////////////////////////////
//main.js

/*
 * Temporary debug function, which allows to catch runtime errors
 * more easily. The callstack of the browser then guides to the
 * actual error position.
 */
function assert(condition, message){

	if(!condition){
		if(typeof Error !== "undefined"){
			throw new Error(message);
		}else{
			throw message;
		}
	}

}

function main(){

	//check if browser supports the required modules
	assert(window.File && window.FileReader && window.FileList && window.Blob, "File API not supported.");
	assert('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document, "Pointer lock not supported.");

	////////////////////////////////////////
	//add eventlisteners to all gui elements

	document.getElementById("FILE_INPUT").addEventListener("change", APP_InputActions.fileInputChanged, false);

	//slider
	document.getElementById("SLIDER_TDT").addEventListener('input', APP_InputActions.sliderTDTChanged, false);
	document.getElementById("SLIDER_DDT").addEventListener('input', APP_InputActions.sliderDDTChanged, false);
	document.getElementById("SLIDER_SEGMENTATION").addEventListener('input', APP_InputActions.sliderSegmentationChanged, false);
	document.getElementById("SLIDER_DIFFUSE").addEventListener('input', APP_InputActions.sliderDiffuseChanged, false);
	document.getElementById("SLIDER_SHADOW").addEventListener('input', APP_InputActions.sliderShadowChanged, false);
	document.getElementById("SLIDER_SUN_X").addEventListener('input', APP_InputActions.sliderSunXChanged, false);
	document.getElementById("SLIDER_SUN_Y").addEventListener('input', APP_InputActions.sliderSunYChanged, false);

	//buttons
	document.getElementById("BUTTON_SCREENSHOT").addEventListener('click', APP_InputActions.screenshot, false);
	document.getElementById("BUTTON_EXPORT_SHADOWS").addEventListener('click', APP_InputActions.exportShadows, false);

	//canvas navigation
	document.getElementById("CANVAS").addEventListener('mousedown', APP_InputDeviceHandler.noticeMouseButtonDown, false);
	document.addEventListener('pointerlockchange', APP_InputDeviceHandler.noticePointerCatch, false);
	document.addEventListener('mozpointerlockchange', APP_InputDeviceHandler.noticePointerCatch, false);
	document.addEventListener('webkitpointerlockchange', APP_InputDeviceHandler.noticePointerCatch, false);

	//
	////////////////////////////////////////

	//do general program initialization
	APP_InputActions.initialize();

}

window.onload = function(){

	main();

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
