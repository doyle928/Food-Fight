(function() {
  function controllerFunction(FoodFightService, $location) {
    const $ctrl = this;
    $ctrl.eventObj = {};
    $ctrl.progressBar;
    $ctrl.amount;
    $ctrl.dayCount;
    $ctrl.usedEvents = [];
    $ctrl.randPiggy = Math.floor(Math.random() * 12) + 5;
    $ctrl.randDonate = Math.floor(Math.random() * 30) + 20;
    $ctrl.randPiggyUse = 1;
    $ctrl.randDonateUse = 1;

    getEverything();
    console.log($ctrl.eventObj);
    $ctrl.selectOption = function(amount) {
      //  console.log(amount);
      FoodFightService.changeProgressBar(amount);
      FoodFightService.changeAmount(amount);
      getEverything();
      if ($ctrl.amount <= 0) {
        $location.path("/results");
      }
    };

    $ctrl.piggyBank = function() {
      if ($ctrl.randPiggyUse > 0) {
        let randPiggyHolder = $ctrl.randPiggy;
        FoodFightService.breakPiggy(randPiggyHolder);
        $ctrl.progressBar = FoodFightService.getProgressBar();
        $ctrl.amount = FoodFightService.getAmount();
        $(".mainProgress").attr("value", $ctrl.amount);
        $("progress").attr("max", randPiggyHolder + 150);
        $ctrl.randPiggyUse--;
      } else {
        //end goal => show div with error
        alert("You've already taken your kids' piggy-banks!");
      }
    };
    $ctrl.donBlood = function() {
      if ($ctrl.randDonateUse > 0) {
        let randDonateHolder = $ctrl.randDonate;
        FoodFightService.donateBlood(randDonateHolder);
        $ctrl.progressBar = FoodFightService.getProgressBar();
        $ctrl.amount = FoodFightService.getAmount();
        $(".mainProgress").attr("value", $ctrl.amount);
        $("progress").attr("max", randDonateHolder + 150);
        $ctrl.randDonateUse--;
      } else {
        //end goal=> show div with error
        alert("You've already given blood!");
      }
    };

    function getEverything() {
      FoodFightService.getEvents().then(event => {
        //console.log(event);
        if (event.repeatability === true) {
          $ctrl.eventObj = event;
        } else {
          getEverything();
        }
      });
      // $ctrl.eventObj = event;
      // $ctrl.usedEvents.push(event.id);
      $ctrl.progressBar = FoodFightService.getProgressBar();
      $ctrl.amount = FoodFightService.getAmount();
      $ctrl.dayCount = FoodFightService.changeDayCount();
      $(".mainProgress").attr("value", $ctrl.amount);
      var windowWidth = $(window).width();
      if (windowWidth < 480) {
        cashMinItems();
      } else {
        cashMenuItems();
      }
      //   } else {
      //     getEverything();
      //   }
      // });
    }

    function cashMenuItems() {
      $(".needCashMenu").css("width", "122px");
      $(".main").css("margin-left", "119px");
      $(".getCash").css("left", "119px");
      $(".topInfo").css("left", "119px");
      $("progress").css("left", "119px");
      $("footer").css("left", "calc(50% + 119px)");
      $(".needCashMenu")
        .find("li")
        .css("margin-left", "0");
    }

    $ctrl.cashMenu = function() {
      var windowWidth = $(window).width();
      if (windowWidth < 480) {
        cashMenuItems();
      } else {
        console.log("viewport too big");
      }
    };

    function cashMinItems() {
      $(".needCashMenu").css("width", "0");
      $(".main").css("margin-left", "0px");
      $(".getCash").css("left", "0");
      $(".topInfo").css("left", "0");
      $("progress").css("left", "0");
      $("footer").css("left", "50%");
      $(".needCashMenu")
        .find("li")
        .css("margin-left", "-80px");
    }
    $ctrl.cashMin = function() {
      let windowWidth = $(window).width();
      windowWidth = parseInt(windowWidth);
      if (windowWidth < 480) {
        cashMinItems();
      } else {
        console.log("viewport too big");
      }
    };
    function updateSize() {
      var windowWidth = $(window).width();
      if (windowWidth < 480) {
        cashMinItems();
      } else {
        cashMenuItems();
      }
    }
    $(document).ready(updateSize);
    $(window).resize(updateSize);
  }
  angular.module("App").controller("controllerFunction", controllerFunction);
})();
