///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_ImageProcessor.js

/*
 * This class serves as a namespace for all image manipulation
 * and information extraction functions.
 */
class APP_ImageProcessor{

	static createVerticesFromDepthImage(image, direction){

		var vertices = [];

		//get inverse perspective projection matrix
		//because of the way the images are (90° for each direction), are the parameters constant
		var perspCamera 			= new THREE.PerspectiveCamera(90, 1, 0.1, 1000);
		var inverseProjectionMatrix = new THREE.Matrix4().getInverse(perspCamera.projectionMatrix);

		for(var y = 0; y < image.getHeight(); y++){

			for(var x = 0; x < image.getWidth(); x++){

				var r = image.getComponent(x, y, 0);
				var g = image.getComponent(x, y, 1);
				var b = image.getComponent(x, y, 2);
				//mean and normalize the components
				var grey = ( (r + g + b) / 3.0 ) / 255.0; //range [0,1]

				var texX = ((x / image.getWidth()) * 2) - 1; //range [-1,1]
				var texY = ((y / image.getHeight()) * 2) - 1; //range [-1,1]

				//alternatively for other depth precisions: 1/(grey*grey);
				var depth = (grey * 2) - 1; //range [-1,1]

				//since depth images of bottom are very inaccurate -> set to a constant value
				if(direction == APP_GlobalData.BOTTOM){
					depth = -0.65; //empirical value
				}

				//project depth via inverse projection matrix
				var position 					= new THREE.Vector4(texX, -texY, depth, 1.0);
				var inverseProjectedPosition 	= position.applyMatrix4(inverseProjectionMatrix);
				inverseProjectedPosition 		= inverseProjectedPosition.multiplyScalar(1/inverseProjectedPosition.w);

				//rotate vertex around the center
				var vec3Pos = new THREE.Vector3(inverseProjectedPosition.x, inverseProjectedPosition.y, inverseProjectedPosition.z);

				var axis;
				var angle;
				if(direction == APP_GlobalData.FRONT){
					angle = 0;
					axis = new THREE.Vector3(0,1,0);
				}
				else if(direction == APP_GlobalData.BACK){
					angle = (180/360) * (2 * Math.PI);
					axis = new THREE.Vector3(0,1,0);
				}
				else if(direction == APP_GlobalData.LEFT){
					angle = (90/360) * (2 * Math.PI);
					axis = new THREE.Vector3(0,1,0);
				}
				else if(direction == APP_GlobalData.RIGHT){
					angle = (270/360) * (2 * Math.PI);
					axis = new THREE.Vector3(0,1,0);
				}
				else if(direction == APP_GlobalData.BOTTOM){
					angle = (270/360) * (2 * Math.PI);
					axis = new THREE.Vector3(1,0,0);
				}
				else if(direction == APP_GlobalData.TOP){
					angle = (90/360) * (2 * Math.PI);
					axis = new THREE.Vector3(1,0,0);
				}
				vec3Pos.applyAxisAngle(axis, angle);

				//push final vertices
				vertices.push(vec3Pos.x);
				vertices.push(vec3Pos.y);
				vertices.push(vec3Pos.z);

			}

		}

		return vertices;

	}

	static createColorsFromSegmentationImage(image){

		var colors = [];

		var red 		= [1,0,0];
		var green 		= [0,1,0];
		var blue 		= [0,0,1];
		var yellow 		= [1,1,0];
		var lightblue 	= [0,1,1];
		var purple 		= [1,0,1];

		var presetColors = [red, green, blue, yellow, lightblue, purple];

		for(var y = 0; y < image.getHeight(); y++){

			for(var x = 0; x < image.getWidth(); x++){

				var segmentationCode = image.getComponent(x, y, 0);
				var currentColor = presetColors[segmentationCode-1];

				var r = currentColor[0];
				var g = currentColor[1];
				var b = currentColor[2];

				colors.push(r);
				colors.push(g);
				colors.push(b);

			}

		}

		return colors;

	}

	static calculateDistances(vertices, width, height){

		var distances = [];
		var vertexImage = new APP_Image(vertices, width, height, 3);

		for(var y = 0; y < height; y++){

			for(var x = 0; x < width; x++){

				var currentVertex = vertexImage.getPixel(x, y);
				var neighbors = [];

				neighbors.push(vertexImage.getPixel(x, y-1));
				neighbors.push(vertexImage.getPixel(x, y+1));
				neighbors.push(vertexImage.getPixel(x+1, y));
				neighbors.push(vertexImage.getPixel(x-1, y));

				for(var i = 0; i < neighbors.length; i++){

					if(neighbors[i] == undefined){
						distances.push(0);
					}else{

						var diffX = currentVertex[0] - neighbors[i][0];
						var diffY = currentVertex[1] - neighbors[i][1];
						var diffZ = currentVertex[2] - neighbors[i][2];
						var distance = Math.sqrt(diffX * diffX + diffY * diffY + diffZ * diffZ);
						distances.push(distance);

					}

				}

			}

		}

		return distances;

	}

	static calculateDepthDistances(image){

		var differences = [];

		for(var y = 0; y < image.getHeight(); y++){

			for(var x = 0; x < image.getWidth(); x++){

				var currentDepth = image.getComponent(x, y, 0);
				var neighbors = [];

				neighbors.push(image.getComponent(x, y-1, 0));
				neighbors.push(image.getComponent(x, y+1, 0));
				neighbors.push(image.getComponent(x+1, y, 0));
				neighbors.push(image.getComponent(x-1, y, 0));

				for(var i = 0; i < neighbors.length; i++){

					if(neighbors[i] == undefined){
						differences.push(0);
					}else{
						var diff = currentDepth - neighbors[i];
						differences.push(diff);
					}

				}

			}

		}

		return differences;

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
