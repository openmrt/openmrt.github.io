///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Util.js

/*
 * This class serves as a namespace for all minor functions, which fulfill
 * auxiliary tasks.
 */
class APP_Util{

	static getMin(array){

		var min = Number.MAX_VALUE;
		for(var i = 0; i < array.length; i++){
			if(min > array[i]){
				min = array[i];
			}
		}
		return min;

	}

	static getMax(array){

		var max = -Number.MAX_VALUE;
		for(var i = 0; i < array.length; i++){
			if(max < array[i]){
				max = array[i];
			}
		}
		return max;

	}

	static vecFromSphereCoords(longitude, latitude){

		var x = Math.cos(longitude) * Math.sin(latitude);
		var y = Math.cos(latitude);
		var z = Math.sin(longitude) * Math.sin(latitude);

		return new THREE.Vector3(x, y, z);

	}

	static getMedian(array){

		APP_Util.bubblesort(array);

		var middle = Math.floor(array.length * 0.5);
		return array[middle];

	}

	static bubblesort(array){

		for(var i = array.length; i > 1; i--){

			for(var j = 0; j < i-1; j++){

				if(array[j] > array[j+1]){
					var temp = array[j+1];
					array[j+1] = array[j];
					array[j] = temp;
				}

			}

		}

	}

	static convertToFloat32Array(array){

		var float32Array = new Float32Array(array.length);

		for(var i = 0; i < array.length; i++){

			float32Array[i] = array[i];

		}

		return float32Array;

	}

	static getVectorFromArray(array, index){

		var x = array[index+0];
		var y = array[index+1];
		var z = array[index+2];

		return new THREE.Vector3(x, y, z);

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
