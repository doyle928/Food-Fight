(function () {
 function controllerFunction (FoodFightService,$route){
 	var $ctrl = this;
 	$ctrl.eventObj = {};
 	$ctrl.progressBar;
 	$ctrl.amount;
 	$ctrl.dayCount;

 	getEverything();
 	console.log($ctrl.eventObj);
  $ctrl.selectOption = function(amount){
    console.log(amount);
		FoodFightService.changeProgressBar(amount);
		FoodFightService.changeAmount(amount);
    //$route.reload();
		getEverything();
		eventObj = {};
	}
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



 }
	angular
	.module("App")
	.controller("controllerFunction", controllerFunction);










})();
