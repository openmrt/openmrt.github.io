///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_InputActions.js

/*
 * This class provides a namespace for all incoming actions from the gui.
 * Through the asynchronous loading system, the actions get forwarded to
 * APP_LoadedActions, where further actions are done.
 */
class APP_InputActions{

	static initialize(){
		APP_LoadedActions.initialize();
	}

	static fileInputChanged(evt){
		APP_Parser.parseAndLoadInputFiles(evt.target.files, APP_LoadedActions.fileInputChanged);
	}

    static displayModeChanged() {
        const displayMode = document.getElementById("DISPLAY_MODE").value;

        switch (displayMode) {
            case "mesh":
                APP_GlobalData.display = APP_GlobalData.DISPLAY_MESH;
                APP_GlobalData.inputLocked = false;
                APP_GlobalData.renderer.setShader(APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW);
                break;
            case "shadowmap":
                APP_GlobalData.display = APP_GlobalData.DISPLAY_SHADOWMAP;
                APP_GlobalData.inputLocked = true;
                APP_GlobalData.renderer.setShader(APP_GlobalData.SHADER_ID_SHADOWMAP);
                break;
            default:
                console.error("Unknown display mode:", displayMode);
                return;
        }

        APP_GlobalData.renderer.invalidateShadowMap();
    }

	static sliderTDTChanged(evt){
		APP_GlobalData.TDT = evt.target.value;
		APP_GlobalData.renderer.invalidateShadowMap();
	}

	static sliderDDTChanged(evt){
		APP_GlobalData.DDT = evt.target.value;
		APP_GlobalData.renderer.invalidateShadowMap();
	}

	static sliderSegmentationChanged(evt){
		APP_GlobalData.interpFacSeg = evt.target.value;
	}

	static sliderDiffuseChanged(evt){
		APP_GlobalData.interpFacDif = evt.target.value;
	}

	static sliderShadowChanged(evt){
		APP_GlobalData.interpFacSdw = evt.target.value;
	}

	static sliderSunXChanged(evt){

		APP_GlobalData.sun.setPositionVec(APP_Util.vecFromSphereCoords(document.getElementById("SLIDER_SUN_X").value, document.getElementById("SLIDER_SUN_Y").value).multiplyScalar(13));
		APP_GlobalData.renderer.invalidateShadowMap();

	}

	static sliderSunYChanged(evt){

		APP_GlobalData.sun.setPositionVec(APP_Util.vecFromSphereCoords(document.getElementById("SLIDER_SUN_X").value, document.getElementById("SLIDER_SUN_Y").value).multiplyScalar(13));
		APP_GlobalData.renderer.invalidateShadowMap();

	}

	static screenshot(){

		var imageData = APP_GlobalData.renderer.getRenderBufferAsDOMImage();

		var downloadHandle = document.createElement("a");
        downloadHandle.style.display = 'none';
        document.body.appendChild(downloadHandle);
		downloadHandle.setAttribute("href", imageData);
		downloadHandle.setAttribute("download", "screenshot.png");
		downloadHandle.click();

		document.body.removeChild(downloadHandle);
		downloadHandle.remove();

	}

	static exportShadows(){

		var renderTargets = APP_GlobalData.renderer.renderUVExport(512, 512);

		for(var i = 0; i < renderTargets.length; i++){

			APP_Loader.save("shadows.png", renderTargets[i], APP_GlobalData.renderer.m_THR_renderer);
	        renderTargets[i].dispose();

		}

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
