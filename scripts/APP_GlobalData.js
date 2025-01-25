///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_GlobalData.js

/*
 * This class serves as a namespace for all static global variables, which need
 * to be saved accross method invokations.
 */
class APP_GlobalData{}

APP_GlobalData.renderer;
APP_GlobalData.rawImageStorage;
APP_GlobalData.sun;

APP_GlobalData.SHADOWMAP_WIDTH 	= 1024;
APP_GlobalData.SHADOWMAP_HEIGHT = 512;

APP_GlobalData.inputLocked 		= false;
APP_GlobalData.display			= 1;
APP_GlobalData.TDT 				= 0.01;
APP_GlobalData.DDT 				= 0.01;
APP_GlobalData.CAMERA_MOVEMENT_SPEED 	= 0.005;
APP_GlobalData.CAMERA_ROTATION_SPEED 	= 0.1;
APP_GlobalData.SUN_DISTANCE_SCALE		= 10;

APP_GlobalData.interpFacSeg		= 0.5;
APP_GlobalData.interpFacDif		= 0.5;
APP_GlobalData.interpFacSdw		= 0.5;

//////////////////////////////////////////////////////////////////////
//segClasses:
//
//	1 - sky
//	2 - trees
//	3 - buildings
//	4 - streets
//  5 - grass
//  6 - moving objects
//
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//CONVENTION(eric): the image data is ordered like the following:
//
//	APP_GlobalData.FRONT
//	APP_GlobalData.BACK
//	APP_GlobalData.LEFT
//	APP_GlobalData.RIGHT
// 	APP_GlobalData.TOP
//  APP_GlobalData.BOTTOM
//
//////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
//const

APP_GlobalData.NUMBER_OF_IMAGES = 6;

APP_GlobalData.FRONT 	= 0;
APP_GlobalData.BACK 	= 1;
APP_GlobalData.LEFT 	= 2;
APP_GlobalData.RIGHT 	= 3;
APP_GlobalData.TOP 		= 4;
APP_GlobalData.BOTTOM 	= 5;

APP_GlobalData.NORTH 	= 0;
APP_GlobalData.WEST 	= 1;
APP_GlobalData.EAST 	= 2;
APP_GlobalData.SOUTH 	= 3;

APP_GlobalData.DISPLAY_MESH 		= 0;
APP_GlobalData.DISPLAY_SHADOWMAP 	= 1;

APP_GlobalData.SHADER_ID_TRIANGLES_SHADOW 	= 0;
APP_GlobalData.SHADER_ID_SHADOWMAP 			= 1;
APP_GlobalData.SHADER_ID_SUN				= 2;
APP_GlobalData.SHADER_ID_UV_SHADOW			= 3;

//
///////////////////////////////////////////////////////////////////////////////////////////////////
