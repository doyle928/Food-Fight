(function() {
  function controllerFunction(FoodFightService, $location) {
    var $ctrl = this;
    $ctrl.eventObj = {};
    $ctrl.progressBar;
    $ctrl.amount;
    $ctrl.dayCount;
    $ctrl.usedEvents = [];
    $ctrl.randPiggy = Math.floor(Math.random() * 12) + 5;
    $ctrl.randDonate = Math.floor(Math.random() * 26) + 20;
    $ctrl.randPiggyUse = 1;
    $ctrl.randDonateUse = 1;

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

    $ctrl.piggyBank = function() {
      if ($ctrl.randPiggyUse > 0) {
        FoodFightService.breakPiggy($ctrl.randDonate);
        $ctrl.progressBar = FoodFightService.getProgressBar();
        $ctrl.amount = FoodFightService.getAmount();
        $(".mainProgress").attr("value", $ctrl.amount);
        $ctrl.randPiggyUse--;
      } else {
        //end goal => show div with error
        alert("you cruel bastard");
      }
    };
    $ctrl.donBlood = function() {
      if ($ctrl.randDonateUse > 0) {
        FoodFightService.donateBlood($ctrl.randDonate);
        $ctrl.progressBar = FoodFightService.getProgressBar();
        $ctrl.amount = FoodFightService.getAmount();
        $(".mainProgress").attr("value", $ctrl.amount);
        $ctrl.randDonateUse--;
      } else {
        //end goal=> show div with error
        alert("you already gave blood");
      }
    };

    function getEverything() {
      FoodFightService.getEvents().then(event => {
        if ($ctrl.usedEvents.indexOf(event.id) == -1) {
          $ctrl.eventObj = event;
          $ctrl.usedEvents.push(event.id);
        } else {
          getEverything();
        }
      });
      $ctrl.progressBar = FoodFightService.getProgressBar();
      $ctrl.amount = FoodFightService.getAmount();
      $ctrl.dayCount = FoodFightService.changeDayCount();
      $(".mainProgress").attr("value", $ctrl.amount);
    }
  }

  angular.module("App").controller("controllerFunction", controllerFunction);
})();
