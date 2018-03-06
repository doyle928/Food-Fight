(function() {
  function controllerFunction(FoodFightService, $location) {
    var $ctrl = this;
    $ctrl.eventObj = {};
    $ctrl.progressBar;
    $ctrl.amount;
    $ctrl.dayCount;

    getEverything();
    console.log($ctrl.eventObj);
    $ctrl.selectOption = function(amount) {
      console.log(amount);
      FoodFightService.changeProgressBar(amount);
      FoodFightService.changeAmount(amount);
      getEverything();
      if ($ctrl.amount <= 0) {
        $location.path("/results");
      }
    };

    function getEverything() {
      $ctrl.eventObj = FoodFightService.changeEvent();
      console.log($ctrl.eventObj);
      $ctrl.progressBar = FoodFightService.getProgressBar();
      $ctrl.amount = FoodFightService.getAmount();
      $ctrl.dayCount = FoodFightService.changeDayCount();
      $(".mainProgress").attr("value", $ctrl.amount);
    }
  }
  angular.module("App").controller("controllerFunction", controllerFunction);
})();
