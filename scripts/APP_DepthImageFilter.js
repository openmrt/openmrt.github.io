///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_DepthImageFilter.js

/*
 * This class serves as a namespace for all depth image based filters.
 */
class APP_DepthImageFilter{

	static selectiveMinFilter(depImage, segImage, halfWindowSize, segClass, jumpSize){

		var copyOfOriginalImage = APP_Image.fromOther(depImage);

		for(var y = 0; y < depImage.getHeight(); y++){

			for(var x = 0; x < depImage.getWidth(); x++){

				var currentClass = segImage.getComponent(x, y, 0);

				if(currentClass != segClass){
					continue;
				}

				///////////////////////////////////////////////////////////
				//get neighbors

				var neighbors = [];

				for(var ny = -halfWindowSize; ny < halfWindowSize; ny+=jumpSize){

					for(var nx = -halfWindowSize; nx < halfWindowSize; nx+=jumpSize){

						var value = copyOfOriginalImage.getComponent(x+nx, y+ny, 0);

						var neighborClass = segImage.getComponent(x+nx, y+ny, 0);
						if(neighborClass != segClass){
							continue;
						}

						if(value != undefined){
							neighbors.push(value);
						}

					}

				}

				//
				///////////////////////////////////////////////////////////

				var min = APP_Util.getMin(neighbors);

				depImage.setComponent(x, y, 0, min);
				depImage.setComponent(x, y, 1, min);
				depImage.setComponent(x, y, 2, min);
				depImage.setComponent(x, y, 3, min);


			}

		}

	}

	static selectiveMaxFilter(depImage, segImage, halfWindowSize, segClass, jumpSize){

		var copyOfOriginalImage = APP_Image.fromOther(depImage);

		for(var y = 0; y < depImage.getHeight(); y++){

			for(var x = 0; x < depImage.getWidth(); x++){

				var currentClass = segImage.getComponent(x, y, 0);

				if(currentClass != segClass){
					continue;
				}

				///////////////////////////////////////////////////////////
				//get neighbors

				var neighbors = [];

				for(var ny = -halfWindowSize; ny < halfWindowSize; ny+=jumpSize){

					for(var nx = -halfWindowSize; nx < halfWindowSize; nx+=jumpSize){

						var value = copyOfOriginalImage.getComponent(x+nx, y+ny, 0);

						var neighborClass = segImage.getComponent(x+nx, y+ny, 0);
						if(neighborClass != segClass){
							continue;
						}

						if(value != undefined){
							neighbors.push(value);
						}

					}

				}

				//
				///////////////////////////////////////////////////////////

				var max = APP_Util.getMax(neighbors);

				depImage.setComponent(x, y, 0, max);
				depImage.setComponent(x, y, 1, max);
				depImage.setComponent(x, y, 2, max);
				depImage.setComponent(x, y, 3, max);


			}

		}

	}

	static selectiveMeanFilter(depImage, segImage, halfWindowSize, segClass, jumpSize){

		var copyOfOriginalImage = APP_Image.fromOther(depImage);

		for(var y = 0; y < depImage.getHeight(); y++){

			for(var x = 0; x < depImage.getWidth(); x++){

				var currentClass = segImage.getComponent(x, y, 0);

				if(currentClass != segClass){
					continue;
				}

				///////////////////////////////////////////////////////////
				//get neighbors

				var sum = 0;
				var num = 0;

				for(var ny = -halfWindowSize; ny < halfWindowSize; ny+=jumpSize){

					for(var nx = -halfWindowSize; nx < halfWindowSize; nx+=jumpSize){

						var value = copyOfOriginalImage.getComponent(x+nx, y+ny, 0);

						var neighborClass = segImage.getComponent(x+nx, y+ny, 0);
						if(neighborClass != segClass){
							continue;
						}

						sum += value;
						num++;

					}

				}

				//
				///////////////////////////////////////////////////////////

				var mean = sum / num;

				depImage.setComponent(x, y, 0, mean);
				depImage.setComponent(x, y, 1, mean);
				depImage.setComponent(x, y, 2, mean);
				depImage.setComponent(x, y, 3, mean);


			}

		}

	}

	static selectiveMedianFilter(depImage, segImage, halfWindowSize, segClass, jumpSize){

		var copyOfOriginalImage = APP_Image.fromOther(depImage);

		for(var y = 0; y < depImage.getHeight(); y++){

			for(var x = 0; x < depImage.getWidth(); x++){

				var currentClass = segImage.getComponent(x, y, 0);

				if(currentClass != segClass){
					continue;
				}

				///////////////////////////////////////////////////////////
				//get neighbors

				var neighbors = [];

				for(var ny = -halfWindowSize; ny < halfWindowSize; ny+=jumpSize){

					for(var nx = -halfWindowSize; nx < halfWindowSize; nx+=jumpSize){

						var value = copyOfOriginalImage.getComponent(x+nx, y+ny, 0);

						var neighborClass = segImage.getComponent(x+nx, y+ny, 0);
						if(neighborClass != segClass){
							continue;
						}

						if(value != undefined){
							neighbors.push(value);
						}

					}

				}

				//
				///////////////////////////////////////////////////////////

				var median = APP_Util.getMedian(neighbors);

				depImage.setComponent(x, y, 0, median);
				depImage.setComponent(x, y, 1, median);
				depImage.setComponent(x, y, 2, median);
				depImage.setComponent(x, y, 3, median);


			}

		}

	}

	static filterJoinEdges(depImages, halfWindowSize){

										//front			//left
		APP_DepthImageFilter.filterEdge(depImages[0], depImages[2], APP_GlobalData.WEST, halfWindowSize);
		APP_DepthImageFilter.filterEdge(depImages[2], depImages[0], APP_GlobalData.EAST, halfWindowSize);

										//front			//right
		APP_DepthImageFilter.filterEdge(depImages[0], depImages[3], APP_GlobalData.EAST, halfWindowSize);
		APP_DepthImageFilter.filterEdge(depImages[3], depImages[0], APP_GlobalData.WEST, halfWindowSize);

										//back			//left
		APP_DepthImageFilter.filterEdge(depImages[1], depImages[2], APP_GlobalData.EAST, halfWindowSize);
		APP_DepthImageFilter.filterEdge(depImages[2], depImages[1], APP_GlobalData.WEST, halfWindowSize);

										//back			//right
		APP_DepthImageFilter.filterEdge(depImages[1], depImages[3], APP_GlobalData.WEST, halfWindowSize);
		APP_DepthImageFilter.filterEdge(depImages[3], depImages[1], APP_GlobalData.EAST, halfWindowSize);

	}

	static filterEdge(depImageA, depImageB, direction, halfWindowSize){

		switch(direction){

			case APP_GlobalData.NORTH:{

				for(var x = 0; x < depImageA.getWidth(); x++){

					var previousValue = depImageB.getComponent(x, depImageA.getHeight()-1, 0);

					var count = 0;
					for(var y = 0; count < halfWindowSize; y++){

						var currentValue = depImageA.getComponent(x, y, 0);
						var newValue = (previousValue + currentValue) * 0.5;

						depImageA.setComponent(x, y, 0, newValue);
						depImageA.setComponent(x, y, 1, newValue);
						depImageA.setComponent(x, y, 2, newValue);
						depImageA.setComponent(x, y, 3, newValue);
						previousValue = newValue;
						count++;

					}

				}

			}break;

			case APP_GlobalData.WEST:{

				for(var y = 0; y < depImageA.getHeight(); y++){

					var previousValue = depImageB.getComponent(depImageA.getWidth()-1, y, 0);

					var count = 0;
					for(var x = 0; count < halfWindowSize; x++){

						var currentValue = depImageA.getComponent(x, y, 0);
						var newValue = (previousValue + currentValue) * 0.5;

						depImageA.setComponent(x, y, 0, newValue);
						depImageA.setComponent(x, y, 1, newValue);
						depImageA.setComponent(x, y, 2, newValue);
						depImageA.setComponent(x, y, 3, newValue);
						previousValue = newValue;
						count++;

					}

				}

			}break;

			case APP_GlobalData.EAST:{

				for(var y = 0; y < depImageA.getHeight(); y++){

					var previousValue = depImageB.getComponent(0, y, 0);

					var count = 0;
					for(var x = (depImageA.getWidth()-1); count < halfWindowSize; x--){

						var currentValue = depImageA.getComponent(x, y, 0);
						var newValue = (previousValue + currentValue) * 0.5;

						depImageA.setComponent(x, y, 0, newValue);
						depImageA.setComponent(x, y, 1, newValue);
						depImageA.setComponent(x, y, 2, newValue);
						depImageA.setComponent(x, y, 3, newValue);
						previousValue = newValue;
						count++;

					}

				}

			}break;

			case APP_GlobalData.SOUTH:{

				for(var x = 0; x < depImageA.getWidth(); x++){

					var previousValue = depImageB.getComponent(x, 0, 0);

					var count = 0;
					for(var y = (depImageA.getHeight()-1); count < halfWindowSize; y--){

						var currentValue = depImageA.getComponent(x, y, 0);
						var newValue = (previousValue + currentValue) * 0.5;

						depImageA.setComponent(x, y, 0, newValue);
						depImageA.setComponent(x, y, 1, newValue);
						depImageA.setComponent(x, y, 2, newValue);
						depImageA.setComponent(x, y, 3, newValue);
						previousValue = newValue;
						count++;

					}

				}

			}break;

		}

	}

	static filterSmoothOutwards(depImage, halfWindowSize){

		//north
		for(var x = 0; x < depImage.getWidth(); x++){

			var previousValue = depImage.getComponent(x, halfWindowSize, 0);

			for(var y = halfWindowSize-1; y >= 0; y--){

				var currentValue = depImage.getComponent(x, y, 0);
				var newValue = (currentValue + previousValue) * 0.5;

				depImage.setComponent(x, y, 0, newValue);
				depImage.setComponent(x, y, 1, newValue);
				depImage.setComponent(x, y, 2, newValue);
				depImage.setComponent(x, y, 3, newValue);

				previousValue = newValue;

			}

		}

		//south
		for(var x = 0; x < depImage.getWidth(); x++){

			var previousValue = depImage.getComponent(x, depImage.getHeight() - halfWindowSize, 0);

			for(var y = depImage.getHeight() - halfWindowSize+1; y < depImage.getHeight(); y++){

				var currentValue = depImage.getComponent(x, y, 0);
				var newValue = (currentValue + previousValue) * 0.5;

				depImage.setComponent(x, y, 0, newValue);
				depImage.setComponent(x, y, 1, newValue);
				depImage.setComponent(x, y, 2, newValue);
				depImage.setComponent(x, y, 3, newValue);

				previousValue = newValue;

			}

		}

		//west
		for(var y = 0; y < depImage.getHeight(); y++){

			var previousValue = depImage.getComponent(halfWindowSize, y, 0);

			for(var x = halfWindowSize-1; x >= 0; x--){

				var currentValue = depImage.getComponent(x, y, 0);
				var newValue = (currentValue + previousValue) * 0.5;

				depImage.setComponent(x, y, 0, newValue);
				depImage.setComponent(x, y, 1, newValue);
				depImage.setComponent(x, y, 2, newValue);
				depImage.setComponent(x, y, 3, newValue);

				previousValue = newValue;

			}

		}

		//east
		for(var y = 0; y < depImage.getHeight(); y++){

			var previousValue = depImage.getComponent(depImage.getWidth() - halfWindowSize, y, 0);

			for(var x = depImage.getWidth() - halfWindowSize+1; x < depImage.getWidth(); x++){

				var currentValue = depImage.getComponent(x, y, 0);
				var newValue = (currentValue + previousValue) * 0.5;

				depImage.setComponent(x, y, 0, newValue);
				depImage.setComponent(x, y, 1, newValue);
				depImage.setComponent(x, y, 2, newValue);
				depImage.setComponent(x, y, 3, newValue);

				previousValue = newValue;

			}

		}


	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
