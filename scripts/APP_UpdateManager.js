///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_UpdateManager.js

/*
 * This class handles the logic behind the updates.
 * 1.) the updates invoked by the mainloop
 * 2.) the updates invoked by loading new images
 */
class APP_UpdateManager{

    static mainloop(){
        APP_GlobalData.renderer.render();
        requestAnimationFrame(APP_UpdateManager.mainloop);
    }

	/*
	 * Synchronizes the data of APP_GlobalData with the actual GUI
	 * (may not be equal after webpage reloads)
	 */
	static updateGlobalData(){

		APP_GlobalData.TDT 				= document.getElementById("SLIDER_TDT").value;
		APP_GlobalData.DDT 				= document.getElementById("SLIDER_TDT").value;
		APP_GlobalData.interpFacSeg 	= document.getElementById("SLIDER_SEGMENTATION").value;
		APP_GlobalData.interpFacDif 	= document.getElementById("SLIDER_DIFFUSE").value;
		APP_GlobalData.interpFacSdw 	= document.getElementById("SLIDER_SHADOW").value;

		if(document.getElementById("RADIO_DISPLAY_MESH").checked){
			APP_GlobalData.display = APP_GlobalData.DISPLAY_MESH;
		}else if(document.getElementById("RADIO_DISPLAY_SHADOWMAP").checked){
			APP_GlobalData.display = APP_GlobalData.DISPLAY_SHADOWMAP;
		}

	}

	/*
	 * calculates, based on the image data, saved in APP_GlobalData, the mesh and all of its
	 * subcomponents. After that, the mesh is added to the scene.
	 */
	static loadScene(){

		var imageWidth 	= APP_GlobalData.rawImageStorage.getImageWidth();
		var imageHeight = APP_GlobalData.rawImageStorage.getImageHeight();

		//remove all old (previously loaded meshes) from the renderer
		APP_GlobalData.renderer.clearSceneObjects();

		//add the sun back
		var meshData = APP_Geometry.getIcosahedron();
		APP_GlobalData.sun = APP_Mesh.fromMeshData(meshData);
		APP_GlobalData.renderer.addSceneObject(APP_GlobalData.sun);
		APP_GlobalData.sun.setPositionVec(APP_Util.vecFromSphereCoords(document.getElementById("SLIDER_SUN_X").value, document.getElementById("SLIDER_SUN_Y").value).multiplyScalar(13));

		//the generation of plane indices and texture coordinates is not dependend on the image data
		var indices 	= APP_Geometry.generatePlaneIndices(imageWidth, imageHeight);
		var texCoords 	= APP_Geometry.generatePlaneTexCoords(imageWidth, imageHeight);

		//filter the depth images to enhance the final projection
		var j = 0;
		APP_Scheduler.recursiveExecution(0, function(j){return j < APP_GlobalData.NUMBER_OF_IMAGES}, 1, function(){

			for(var i = 0; i < 15; i++){
				APP_DepthImageFilter.filterSmoothOutwards(APP_GlobalData.rawImageStorage.getDepImages()[j], i*2);
			}

			//filter buildings
			APP_DepthImageFilter.selectiveMedianFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 50, 3, 10);
			APP_DepthImageFilter.selectiveMedianFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 10, 3, 5);
			APP_DepthImageFilter.selectiveMeanFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 4, 3, 2);

			//filter trees
			APP_DepthImageFilter.selectiveMeanFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 4, 2, 2);

			//filter streets
			APP_DepthImageFilter.selectiveMeanFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 4, 4, 2);

			//filter grass
			APP_DepthImageFilter.selectiveMeanFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 4, 5, 2);

			//filter objects in motion
			APP_DepthImageFilter.selectiveMeanFilter(APP_GlobalData.rawImageStorage.getDepImages()[j], APP_GlobalData.rawImageStorage.getSegImages()[j], 4, 6, 2);

			j++;

			document.getElementById("PROGRESS_GLOBAL").value = j/(APP_GlobalData.NUMBER_OF_IMAGES-1)*50;

		}, function(){

		APP_DepthImageFilter.filterJoinEdges(APP_GlobalData.rawImageStorage.getDepImages(), 5);
		APP_DepthImageFilter.filterJoinEdges(APP_GlobalData.rawImageStorage.getDepImages(), 10);
		APP_DepthImageFilter.filterJoinEdges(APP_GlobalData.rawImageStorage.getDepImages(), 20);
		APP_DepthImageFilter.filterJoinEdges(APP_GlobalData.rawImageStorage.getDepImages(), 30);
		APP_DepthImageFilter.filterJoinEdges(APP_GlobalData.rawImageStorage.getDepImages(), 50);

		//extract the information of the images and into a mesh, which then can be passed to the renderer
		var i = 0;
		APP_Scheduler.recursiveExecution(0, function(i){return i < APP_GlobalData.NUMBER_OF_IMAGES}, 1, function(){

			var vertices 		= APP_ImageProcessor.createVerticesFromDepthImage(APP_GlobalData.rawImageStorage.getDepImages()[i], i);
			var normals 		= APP_Geometry.calculateNormals(vertices, imageWidth, imageHeight);
			var segColors 		= APP_ImageProcessor.createColorsFromSegmentationImage(APP_GlobalData.rawImageStorage.getSegImages()[i]);
			var distances 		= APP_ImageProcessor.calculateDistances(vertices, imageWidth, imageHeight);
			var depthDistances 	= APP_ImageProcessor.calculateDepthDistances(APP_GlobalData.rawImageStorage.getDepImages()[i]);

			var mesh = APP_Mesh.fromArrays(vertices, indices, texCoords, segColors, normals, distances, depthDistances, APP_GlobalData.rawImageStorage.getTexImages()[i]);
			APP_GlobalData.renderer.addSceneObject(mesh);
			i++;

			document.getElementById("PROGRESS_GLOBAL").value = i/(APP_GlobalData.NUMBER_OF_IMAGES-1)*50 + 50;

		}, function(){

		//afterwards: reconfigure the renderer
		document.getElementById("PROGRESS_GLOBAL").value = 0;

		APP_GlobalData.renderer.invalidateShadowMap();

		if(APP_GlobalData.display == APP_GlobalData.DISPLAY_MESH){
			APP_GlobalData.renderer.setShader(APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW);
		}else if(APP_GlobalData.display == APP_GlobalData.DISPLAY_SHADOWMAP){
			APP_GlobalData.renderer.setShader(APP_GlobalData.SHADER_ID_SHADOWMAP);
		}

		});
		});

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
