///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Image.js

/*
 * This class is a wrapper for data, that is arranged like an image in order
 * to provide easier access (less index calculations and conversions)
 */
class APP_Image{

	constructor(data, width, height, compNum){

		this.m_data 	= data;
		this.m_width 	= width;
		this.m_height 	= height;
		this.m_compNum  = compNum;

	}

	static fromDOMImage(image){
		return new APP_Image(image.data, image.width, image.height, 4);
	}

	static fromOther(image){
		return new APP_Image(image.m_data.slice(), image.m_width, image.m_height, image.m_compNum);
	}

	toDOMImage(){

		var canvas 		= document.createElement("canvas");
        canvas.width 	= this.m_width;
        canvas.height 	= this.m_height;
        var ctx = canvas.getContext("2d");
        var domImage = ctx.createImageData(this.m_width, this.m_height);
        canvas.remove();

		for(var y = 0; y < this.m_height; y++){

			for(var x = 0; x < this.m_width; x++){

				var index = (x + (y * this.m_width)) * 4;

				domImage.data[index+0] = this.m_data[index+0];
				domImage.data[index+1] = this.m_data[index+1];
				domImage.data[index+2] = this.m_data[index+2];
				domImage.data[index+3] = this.m_data[index+3];

			}

		}

		return domImage;

	}

	toRGBATexture(){

		var texture = new THREE.DataTexture(this.m_data, this.m_width, this.m_height, THREE.RGBAFormat);
		texture.needsUpdate = true;

		return texture;

	}

	setComponent(x, y, compNum, value){

		if(x < 0 || x > this.m_width || y < 0 || y > this.m_height){
			return false;
		}

		var index = ( (x + y * this.m_width) * this.m_compNum ) + compNum;
		this.m_data[index] = value;

		return true;

	}

	getComponent(x, y, compNum){

		if(x < 0 || x > this.m_width || y < 0 || y > this.m_height){
			return undefined;
		}

		var index = ( (x + y * this.m_width) * this.m_compNum ) + compNum;
		return this.m_data[index];

	}

	setPixel(x, y, pixel){

		assert(pixel.length == this.m_compNum);

		if(x < 0 || x > this.m_width || y < 0 || y > this.m_height){
			return false;
		}

		var index = (x + y * this.m_width) * this.m_compNum;

		for(var i = 0; i < pixel.length; i++){
			this.m_data[index+i] = pixel[i];
		}

		return true;

	}

	getPixel(x, y){

		if(x < 0 || x > this.m_width || y < 0 || y > this.m_height){
			return undefined;
		}

		var index = (x + y * this.m_width) * this.m_compNum;

		var pixel = [];
		for(var i = 0; i < this.m_compNum; i++){
			pixel.push(this.m_data[index+i]);
		}

		return pixel;

	}

	getData(){return this.m_data}
	getCompNum(){return this.m_compNum;}
	getWidth(){return this.m_width;}
	getHeight(){return this.m_height;}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
