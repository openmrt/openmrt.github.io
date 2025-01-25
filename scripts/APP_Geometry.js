///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Geometry.js

/*
 * This class serves as a namespace for all basic geometry generation
 * and manipulation functions.
 */
class APP_Geometry{

	static calculateNormals(vertices, width, height){

		var normals = [];

		for(var y = 0; y < height; y++){

			for(var x = 0; x < width; x++){

				var currentIndex = (x + y * width) * 3;

				if(y-1 < 0 && x-1 < 0){ //top left corner

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var currentToRight = new THREE.Vector3();
					currentToRight.subVectors(neighborPos_Right, currentPos);

					var currentToBottom = new THREE.Vector3();
					currentToBottom.subVectors(neighborPos_Bottom, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToBottom, currentToRight);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(y-1 < 0 && x+1 > width){ //top right corner

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var currentToLeft = new THREE.Vector3();
					currentToLeft.subVectors(neighborPos_Left, currentPos);

					var currentToBottom = new THREE.Vector3();
					currentToBottom.subVectors(neighborPos_Bottom, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToLeft, currentToBottom);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(y+1 > height && x-1 < 0){ //bottom left corner

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);

					var currentToRight = new THREE.Vector3();
					currentToRight.subVectors(neighborPos_Right, currentPos);

					var currentToTop = new THREE.Vector3();
					currentToTop.subVectors(neighborPos_Top, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToRight, currentToTop);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(y+1 > height && x+1 > width){ //bottom right corner

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);

					var currentToLeft = new THREE.Vector3();
					currentToLeft.subVectors(neighborPos_Left, currentPos);

					var currentToTop = new THREE.Vector3();
					currentToTop.subVectors(neighborPos_Top, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToTop, currentToLeft);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(x-1 < 0){ //left edge

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var currentToRight = new THREE.Vector3();
					currentToRight.subVectors(neighborPos_Right, currentPos);

					var BottomToTop = new THREE.Vector3();
					BottomToTop.subVectors(neighborPos_Top, neighborPos_Bottom);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToRight, BottomToTop);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(x+1 > width){ //right edge

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var currentToLeft = new THREE.Vector3();
					currentToLeft.subVectors(neighborPos_Left, currentPos);

					var BottomToTop = new THREE.Vector3();
					BottomToTop.subVectors(neighborPos_Top, neighborPos_Bottom);

					var normal = new THREE.Vector3();
					normal.crossVectors(BottomToTop, currentToLeft);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(y-1 < 0){ //top edge

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var rightToLeft = new THREE.Vector3();
					rightToLeft.subVectors(neighborPos_Left, neighborPos_Right);

					var currentToBottom = new THREE.Vector3();
					currentToBottom.subVectors(neighborPos_Bottom, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(rightToLeft, currentToBottom);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else if(y+1 > height){ //bottom edge

					var currentIndex = (x + y * width) * 3;
					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;

					var currentPos = APP_Util.getVectorFromArray(vertices, currentIndex);
					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);

					var rightToLeft = new THREE.Vector3();
					rightToLeft.subVectors(neighborPos_Left, neighborPos_Right);

					var currentToTop = new THREE.Vector3();
					currentToTop.subVectors(neighborPos_Top, currentPos);

					var normal = new THREE.Vector3();
					normal.crossVectors(currentToTop, rightToLeft);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}else{ //somewhere inside

					var neighborIndex_Left = ((x-1) + y * width) * 3;
					var neighborIndex_Right = ((x+1) + y * width) * 3;
					var neighborIndex_Top = (x + (y-1) * width) * 3;
					var neighborIndex_Bottom = (x + (y+1) * width) * 3;

					var neighborPos_Left = APP_Util.getVectorFromArray(vertices, neighborIndex_Left);
					var neighborPos_Right = APP_Util.getVectorFromArray(vertices, neighborIndex_Right);
					var neighborPos_Top = APP_Util.getVectorFromArray(vertices, neighborIndex_Top);
					var neighborPos_Bottom = APP_Util.getVectorFromArray(vertices, neighborIndex_Bottom);

					var rightToLeft = new THREE.Vector3();
					rightToLeft.subVectors(neighborPos_Left, neighborPos_Right);

					var bottomToTop = new THREE.Vector3();
					bottomToTop.subVectors(neighborPos_Top, neighborPos_Bottom);

					var normal = new THREE.Vector3();
					normal.crossVectors(bottomToTop, rightToLeft);
					normal = normal.normalize();

					normals.push(normal.x, normal.y, normal.z);

				}

			}

		}

		return normals;

	}

	static generatePlaneIndices(width, height){

		var indices = [];

		for(var y = 0; y < (height-1); y++){

			for(var x = 0; x < (width-1); x++){

				var i0 = x + (y * width);
				var i1 = x + (y * width) + 1;
				var i2 = x + ((y+1) * width);

				indices.push(i2);
				indices.push(i1);
				indices.push(i0);

				var i3 = x + (y * width) + 1;
				var i4 = x + ((y+1) * width);
				var i5 = x + ((y+1) * width) + 1;

				indices.push(i3);
				indices.push(i4);
				indices.push(i5);

			}

		}

		return indices;

	}

	static generatePlaneTexCoords(width, height){

		var texCoords = [];

		for(var y = 0; y < height; y++){

			for(var x = 0; x < width; x++){

				var u = x / width;
				var v = y / height;

				texCoords.push(u, v);

			}

		}

		return texCoords;

	}

    static toTHRGeometry(meshData){

        var geometry = new THREE.Geometry();
        geometry.vertices = meshData[0];
        for(var i = 0; i < meshData[1].length; i += 3){
            geometry.faces.push(new THREE.Face3(meshData[1][i], meshData[1][i+1], meshData[1][i+2]));
        }

        return geometry;

    }

    static multiply(meshData, value){

        for(var i = 0; i < meshData[0].length; i++){
            meshData[0][i].multiplyScalar(value);
        }

        return meshData;

    }

    static getIcosahedron(){

        ////////////////////////////////////////////////////////////////
        //icosahedron

        //recurring numbers
        var a = 0.525;
        var b = 0.851;
        var c = 0;

        var vertices = [new THREE.Vector3(-a, c, b).normalize(),
                        new THREE.Vector3( a, c, b).normalize(),
                        new THREE.Vector3(-a, c,-b).normalize(),
                        new THREE.Vector3( a, c,-b).normalize(),
                        new THREE.Vector3( c, b, a).normalize(),
                        new THREE.Vector3( c, b,-a).normalize(),
                        new THREE.Vector3( c,-b, a).normalize(),
                        new THREE.Vector3( c,-b,-a).normalize(),
                        new THREE.Vector3( b, a, c).normalize(),
                        new THREE.Vector3(-b, a, c).normalize(),
                        new THREE.Vector3( b,-a, c).normalize(),
                        new THREE.Vector3(-b,-a, c).normalize()];

        var indices = [0,4,1,
                       0,9,4,
                       9,5,4,
                       4,5,8,
                       4,8,1,
                       8,10,1,
                       8,3,10,
                       5,3,8,
                       5,2,3,
                       2,7,3,
                       7,10,3,
                       7,6,10,
                       7,11,6,
                       11,0,6,
                       0,1,6,
                       6,1,10,
                       9,0,11,
                       9,11,2,
                       9,2,5,
                       7,2,11];

        //
        ////////////////////////////////////////////////////////////////

        return [vertices, indices];

    }

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
