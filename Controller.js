(function () {
 function controller(FoodFightService){
 	var $ctrl = this;
 	getEverything();

 	function getEverything (){
 		FoodFightService.changeEvent();
 		FoodFightService.getProgressBar();
 		FoodFightService.getAmount();
 		FoodFightService.changeDayCount();
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
	}

 }
	angular
	.module("App")
	.controller("controller", controller)










})();