///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_LoadedActions.js

/*
 * This class provides a namespace for all incoming actions from APP_InputActions.
 * Through the asynchronous loading system, the actions get forwarded to
 * APP_LoadedActions, where further actions are done.
 */
class APP_LoadedActions{

	static initialize(){

		APP_GlobalData.rawImageStorage 	= new APP_RawImageStorage();

		//store the gui data in memory (after reload, sliders might have changed, so that default values might not be accurate)
		APP_UpdateManager.updateGlobalData();
		document.getElementById("PROGRESS_GLOBAL").value = 0;

		//initialize camera and controls
		var camera = new APP_Camera(45, (512/512), 0.01, 1000, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1));

		//initialize renderer
		APP_GlobalData.renderer = new APP_Renderer("CANVAS", 512, 512, camera);
		APP_GlobalData.renderer.clear();

		//init sun
		var meshData = APP_Geometry.getIcosahedron();
		APP_GlobalData.sun = APP_Mesh.fromMeshData(meshData);
		APP_GlobalData.renderer.addSceneObject(APP_GlobalData.sun);
		APP_GlobalData.sun.setPositionVec(APP_Util.vecFromSphereCoords(document.getElementById("SLIDER_SUN_X").value, document.getElementById("SLIDER_SUN_Y").value).multiplyScalar(13));

		//start update cycle
		requestAnimationFrame(APP_UpdateManager.mainloop);

    }

	//////////////////////////////////////////////////////
	// The layout in which the input images are forwarded.
	//////////////////////////////////////////////////////
	//
	//	APP_GlobalData.FRONT
	//	APP_GlobalData.BACK
	//	APP_GlobalData.LEFT
	//	APP_GlobalData.RIGHT
	// 	APP_GlobalData.TOP
	//  APP_GlobalData.BOTTOM
	//
	//////////////////////////////////////////////////////

	/*
	 * The callback function for general file loading. The incoming files
	 * are sorted in the raw memory store.
	 */
	static fileInputChanged(evt){

		//make sure 6 images are loaded each with depth and segmentation information
		assert(evt.length == 18);

		//reset storage
		APP_GlobalData.rawImageStorage.clear();

		//copy loaded data into storage
		APP_GlobalData.rawImageStorage.fill(evt);

		//update the renderer to display the new data
		APP_GlobalData.renderer.invalidateShadowMap();
		APP_UpdateManager.loadScene();

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
