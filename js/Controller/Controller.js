(function () {
 function controllerFunction (FoodFightService){
 	var $ctrl = this;
 	$ctrl.eventObj = {};
 	$ctrl.progressBar;
 	$ctrl.amount;
 	$ctrl.dayCount;
 	getEverything();
 	console.log($ctrl.eventObj);
 	function getEverything (){
 		$ctrl.eventObj = FoodFightService.changeEvent();
 		console.log($ctrl.eventObj);
 		$ctrl.progressBar = FoodFightService.getProgressBar();
 		// console.log(progressBar);
 		$ctrl.amount = FoodFightService.getAmount();
 		$ctrl.dayCount = FoodFightService.changeDayCount();
	}	
	// $ctrl.sendProgressBarValue = function(progress){
	// 	FoodFightService.changeProgressBar(progress);
	// }
	// $ctrl.sendDollarValue = function(amount){
	// 	FoodFightService.changeAmount(amount);
	
	$ctrl.selectOption = function(amount){
		FoodFightService.changeProgressBar(amount);
		FoodFightService.changeAmount(amount);
		getEverything();
		eventObj = {};
	}

 }
	angular
	.module("App")
	.controller("controllerFunction", controllerFunction);










})();