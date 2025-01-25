///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_RawImageStorage.js

/*
 * Struct like class to accumulate all raw image data loaded by the program.
 */
class APP_RawImageStorage{

    constructor(){

		this.m_imageWidth 	= -1;
		this.m_imageHeight	= -1;
        this.m_texImages 	= [];
        this.m_segImages 	= [];
        this.m_depImages 	= [];

    }

	validateInput(array){

		if(array == undefined || array == null){
			return false;
		}

		if(array.length != APP_GlobalData.NUMBER_OF_IMAGES * 3){
			return false;
		}

		for(var i = 0; i < array.length; i++){
			if(array[i] == undefined || array[i] == 0){
				return false;
			}
		}

		this.m_imageWidth 	= array[0].width;
		this.m_imageHeight	= array[0].height;

		for(var i = 0; i < APP_GlobalData.NUMBER_OF_IMAGES * 2; i++){
			if(array[i].width != this.m_imageWidth || array[i].height != this.m_imageHeight){
				return false;
			}
		}

		return true;

	}

	/*
	 * Requires the array to be in the specified order.
	 */
	fill(array){

		if(!this.validateInput(array)){
			alert("File input corrupted.");
			assert(false);
		}

		for(var i = APP_GlobalData.NUMBER_OF_IMAGES * 0; i < APP_GlobalData.NUMBER_OF_IMAGES * 1; i++){
			this.m_texImages.push(APP_Image.fromDOMImage(array[i]));
		}

		for(var i = APP_GlobalData.NUMBER_OF_IMAGES * 1; i < APP_GlobalData.NUMBER_OF_IMAGES * 2; i++){
			this.m_depImages.push(APP_Image.fromDOMImage(array[i]));
		}

		for(var i = APP_GlobalData.NUMBER_OF_IMAGES * 2; i < APP_GlobalData.NUMBER_OF_IMAGES * 3; i++){
			var buffer = new Uint8Array(array[i].target.result);
			this.m_segImages.push(new APP_Image(buffer, 512, 512, 1));
		}

	}

	isFilled(){

		return 	(
					(this.m_texImages.length == APP_GlobalData.NUMBER_OF_IMAGES) &&
				 	(this.m_segImages.length == APP_GlobalData.NUMBER_OF_IMAGES) &&
				 	(this.m_depImages.length == APP_GlobalData.NUMBER_OF_IMAGES)
				);

	}

    clear(){

        this.m_texImages = [];
        this.m_segImages = [];
        this.m_depImages = [];

    }

	getTexImages(){return this.m_texImages;}
	getSegImages(){return this.m_segImages;}
	getDepImages(){return this.m_depImages;}
	getImageWidth(){return this.m_imageWidth;}
	getImageHeight(){return this.m_imageHeight;}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
