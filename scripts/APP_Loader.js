///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Loader.js

/*
 * This class serves as a namespace for all file IO operations. Since all
 * IO is asynchronous, the functions operate on callbacks.
 */
class APP_Loader{

	/*
	 * Saves either a text, image or binary data.
	 * (in case of the image data, the renderer has to be passed as well, so that
 	 * the pixels of the texture can be read)
	 */
	static save(filename, data, renderer = 0){

		var downloadHandle = document.createElement("a");
        downloadHandle.style.display = 'none';
        document.body.appendChild(downloadHandle);

        var filenameDividedByPoint = filename.split(".");
        var extention = filenameDividedByPoint[filenameDividedByPoint.length - 1];

        if(extention === "txt" || extention === "glsl" || extention === "config" || extention === "csv"){

            var url = URL.createObjectURL(new Blob([data],{type: "text"}));

            downloadHandle.setAttribute("href", url);
            downloadHandle.setAttribute("download", filename);
            downloadHandle.click();

        }else if(extention === "png" || extention === "jpg" && renderer !== 0){

            var pixelData = new Uint8Array(data.width * data.height * 4);
            renderer.readRenderTargetPixels(data, 0, 0, data.width, data.height, pixelData);

            var canvas = document.createElement("canvas");
            canvas.width = data.width;
            canvas.height = data.height;
            var ctx = canvas.getContext("2d");
            var imageData = ctx.createImageData(data.width, data.height);

            for(var i = 0; i < data.height; i++){
                for(var j = 0; j < data.width * 4; j += 4){
                    imageData.data[(i * data.width * 4) + (j + 0)] = pixelData[(((data.height-1) - i) * data.width * 4) + (j + 0)];
                    imageData.data[(i * data.width * 4) + (j + 1)] = pixelData[(((data.height-1) - i) * data.width * 4) + (j + 1)];
                    imageData.data[(i * data.width * 4) + (j + 2)] = pixelData[(((data.height-1) - i) * data.width * 4) + (j + 2)];
                    imageData.data[(i * data.width * 4) + (j + 3)] = pixelData[(((data.height-1) - i) * data.width * 4) + (j + 3)];
                }
            }

            ctx.putImageData(imageData,0,0);

            downloadHandle.setAttribute("href", canvas.toDataURL("image/png"));
            downloadHandle.setAttribute("download", filename);
            downloadHandle.click();

            canvas.remove();

        }else if(extention === "bin" && renderer !== 0){

            var pixelData = new Float32Array(data.width * data.height * 4);
            renderer.readRenderTargetPixels(data, 0, 0, data.width, data.height, pixelData);

            downloadHandle.setAttribute("href", window.URL.createObjectURL(new Blob([new Uint8Array(pixelData.buffer)], {type: "octet/stream"})));
            downloadHandle.setAttribute("download", filename);
            downloadHandle.click();

        }else{
            alert("Failed to save resource: " + filename + "\nUnkown extention: " + extention);
        }

		document.body.removeChild(downloadHandle);
		downloadHandle.remove();

    }

	static loadPixelsOfMultipleImageFiles(files, callback){

		var result = [];
		APP_Loader.loadPixelsOfMultipleImageFilesI(result, files, callback, 0, null);

	}

	/*
 	 * Recursive function. Loads one image after the other, passing itself as the callback
	 * function until all images are loaded. Invokes then the actual callback.
	 */
	static loadPixelsOfMultipleImageFilesI(result, files, callback, index, pixelData){

		if(pixelData != null && pixelData != undefined){
			result.push(pixelData);
		}

		if(files.length <= index){
			callback(result);
		}else{

			while(files[index] == null && files.length > index){
				result.push(null);
				index++;
			}

			if(files[index] != null){

				if(files[index].name.indexOf(".bin") != -1){

					APP_Loader.loadBinaryFile(files[index], APP_Loader.loadPixelsOfMultipleImageFilesI.bind(null, result, files, callback, index+1))

				}else if(files[index].name.indexOf(".png") != -1 || files[index].name.indexOf(".jpg") != -1){

					APP_Loader.loadImageFile(files[index], APP_Loader.extractPixels.bind(0, APP_Loader.loadPixelsOfMultipleImageFilesI.bind(null, result, files, callback, index+1)));

				}else{

					alert("Unknown file extention!");
					return;

				}

			}else{
				callback(result);
			}

		}

	}

	static loadPixelsOfImageFile(file, callback){

		APP_Loader.loadImageFile(file, APP_Loader.extractPixels.bind(0, callback));

	}

	static extractPixels(callback, evt){

		var canvas = document.createElement("canvas");
        canvas.width = evt.target.width;
        canvas.height =  evt.target.height;
        var ctx = canvas.getContext("2d");
		ctx.drawImage(evt.target,0,0);
		var imageData = ctx.getImageData(0,0,evt.target.width, evt.target.height);

		callback(imageData);

	}

	static loadBinaryFile(file, callback){

		var reader = new FileReader();
		reader.onload = callback;
		reader.onerror 	= APP_Loader._onError;
		reader.readAsArrayBuffer(file);

	}

	/*
	 * Loads asynchronously through the FileReader API the image and calls back.
	 */
	static loadImageFile(file, callback){

		var reader = new FileReader();
		reader.onload = APP_Loader.convertURLToImage.bind(reader, callback);
		reader.onerror 	= APP_Loader._onError;
		reader.readAsDataURL(file);

	}

	/*
	 * Converts the loaded image data into URL format for further processing.
	 */
	static convertURLToImage(callback, reader){

		var image = new Image();
		image.onload = callback;
		image.src = reader.target.result;

	}

	/*
	 * Loads asynchronously through the FileReader API the text file and calls back.
	 */
    static loadTextFile(file, callback){

		var reader 		= new FileReader();
		reader.onload 	= callback;
		reader.onerror 	= APP_Loader._onError;
		reader.readAsText(file, "UTF-8");

	}

	/*
	 * Universal error function for all IO.
	 */
	static _onError(evt){
		console.log("Failed to load " + evt.target.value);
	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
