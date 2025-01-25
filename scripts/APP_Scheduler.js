///////////////////////////////////////////////////////////////////////////////////////////////////
//APP_Scheduler.js

/*
 * This class offers convenient timing and scheduling operations.
 */

 /*
  * Usage:
  *
  *		//do stuff
  *
  *		APP_Scheduler.deferreExecution(function(){ //1
  *
  *		//continue like nothing happened
  *
  *		APP_Scheduler.deffereExecution(function(){ //2
  *
  *		APP_Scheduler.recursiveExecution(i, function(){return condition}, step, function(){
  *
  *		//recursive code
  *
  *		}, function(){ //3
  *
  *		//followup code
  *
  *		}); //3
  *		}); //2
  *		}); //1
  *
  */
class APP_Scheduler{

	static getTimeStamp(){
		return Date.now();
	}

	static printDiffTime(otherTimeStamp){
		var diff = APP_Scheduler.getTimeStamp() - otherTimeStamp;
		console.log("Time difference [sec]: " + diff/1000);
	}

	static deffereExecution(callback){
		setTimeout(callback, 0);
	}

	static recursiveExecution(iterationVar, conditionEvaluationCallback, iterationStep, conditionTrueCallback, conditionFalseCallback){

		if(conditionEvaluationCallback(iterationVar)){

			conditionTrueCallback();
			iterationVar += iterationStep;
			setTimeout(APP_Scheduler.recursiveExecution, 0, iterationVar, conditionEvaluationCallback, iterationStep, conditionTrueCallback, conditionFalseCallback);

		}else{

			conditionFalseCallback();

		}

	}

}

//
///////////////////////////////////////////////////////////////////////////////////////////////////
