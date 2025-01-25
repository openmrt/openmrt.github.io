///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Parser.js

/*
 * This class serves as a namespace for the parsing of the input filepaths and
 * sorting them, so they then can get loaded.
 */
class APP_Parser{

	static parseAndLoadInputFiles(files, callback){

		var orderedFiles = [];

		///////////////////////////////////////
		//order:
		//
		//	APP_GlobalData.FRONT   	color
		//	APP_GlobalData.BACK    	color
		//	APP_GlobalData.LEFT    	color
		//	APP_GlobalData.RIGHT   	color
		// 	APP_GlobalData.TOP		color
		//  APP_GlobalData.BOTTOM	color
		//
		//	APP_GlobalData.FRONT   	depth
		//	APP_GlobalData.BACK 	depth
		//	APP_GlobalData.LEFT 	depth
		//	APP_GlobalData.RIGHT 	depth
		// 	APP_GlobalData.TOP		depth
		//  APP_GlobalData.BOTTOM 	depth
		//
        //  APP_GlobalData.FRONT 	segmentation
		//	APP_GlobalData.BACK 	segmentation
		//	APP_GlobalData.LEFT 	segmentation
		//	APP_GlobalData.RIGHT 	segmentation
		// 	APP_GlobalData.TOP		segmentation
		//  APP_GlobalData.BOTTOM 	segmentation
		////////////////////////////////////////

		var front 	= 0;
		var back 	= 0;
		var left 	= 0;
		var right 	= 0;
		var top 	= 0;
		var bottom 	= 0;

		//all color images are sorted
		for(var direction = 0; direction < 6; direction++){

			var validDirectionFound = false;

			for(var i = 0; i < files.length; i++){

				if(direction == APP_GlobalData.FRONT){
					if(files[i].name.indexOf("_0_0_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						front++;
					}
				}

				if(direction == APP_GlobalData.BACK){
					if(files[i].name.indexOf("_180_0_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						back++;
					}
				}

				if(direction == APP_GlobalData.LEFT){
					if(files[i].name.indexOf("_270_0_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						left++;
					}
				}

				if(direction == APP_GlobalData.RIGHT){
					if(files[i].name.indexOf("_90_0_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						right++;
					}
				}

				if(direction == APP_GlobalData.TOP){
					if(files[i].name.indexOf("_0_90_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						top++;
					}
				}

				if(direction == APP_GlobalData.BOTTOM){
					if(files[i].name.indexOf("_0_270_") != -1 && files[i].name.indexOf("color") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound = true;
						bottom++;
					}
				}

			}

			if(!validDirectionFound){
				orderedFiles.push(null);
			}

		}

		//all depth images are sorted
		for(var direction = 0; direction < 6; direction++){

			var validDirectionFound = 0;

			for(var i = 0; i < files.length; i++){

				if(direction == APP_GlobalData.FRONT){
					if(files[i].name.indexOf("_0_0_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						front++;
					}
				}

				if(direction == APP_GlobalData.BACK){
					if(files[i].name.indexOf("_180_0_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						back++;
					}
				}

				if(direction == APP_GlobalData.LEFT){
					if(files[i].name.indexOf("_270_0_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						left++;
					}
				}

				if(direction == APP_GlobalData.RIGHT){
					if(files[i].name.indexOf("_90_0_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						right++;
					}
				}

				if(direction == APP_GlobalData.TOP){
					if(files[i].name.indexOf("_0_90_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						top++;
					}
				}

				if(direction == APP_GlobalData.BOTTOM){
					if(files[i].name.indexOf("_0_270_") != -1 && files[i].name.indexOf("depth") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						bottom++;
					}
				}

			}

			if(!validDirectionFound){
				orderedFiles.push(null);
			}

		}

		//all segmentation images are sorted
		for(var direction = 0; direction < 6; direction++){

			var validDirectionFound = 0;

			for(var i = 0; i < files.length; i++){

				if(direction == APP_GlobalData.FRONT){
					if(files[i].name.indexOf("_0_0_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						front++;
					}
				}

				if(direction == APP_GlobalData.BACK){
					if(files[i].name.indexOf("_180_0_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						back++;
					}
				}

				if(direction == APP_GlobalData.LEFT){
					if(files[i].name.indexOf("_270_0_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						left++;
					}
				}

				if(direction == APP_GlobalData.RIGHT){
					if(files[i].name.indexOf("_90_0_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						right++;
					}
				}

				if(direction == APP_GlobalData.TOP){
					if(files[i].name.indexOf("_0_90_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						top++;
					}
				}

				if(direction == APP_GlobalData.BOTTOM){
					if(files[i].name.indexOf("_0_270_") != -1 && files[i].name.indexOf("seg") != -1 ){
						orderedFiles.push(files[i]);
						validDirectionFound++;
						bottom++;
					}
				}

			}

			if(!validDirectionFound){
				orderedFiles.push(null);
			}

		}

		//check if the actual amount of images is sufficient for rendering
		if((front != 2 && front != 0 && front != 3) || (back != 2 && back != 0 && back != 3) || (left != 2 && left != 0 && left != 3) ||
		   (right != 2 && right != 0 && right != 3) || (top != 2 && top != 0 && top != 3) || (bottom != 2 && bottom != 0 && bottom != 3)){

			alert("Orphaned image.");
			return;

		}

		APP_Loader.loadPixelsOfMultipleImageFiles(orderedFiles, callback);

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
