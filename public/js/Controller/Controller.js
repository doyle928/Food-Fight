(function() {
  function controllerFunction(FoodFightService, $location) {
    const $ctrl = this;
    $ctrl.eventObj = {};
    $ctrl.progressBar;
    $ctrl.amount;
    $ctrl.dayCount;
    $ctrl.moodCurrent;
    $ctrl.usedEvents = [];
    $ctrl.randPiggy = Math.floor(Math.random() * 12) + 5;
    $ctrl.randDonate = Math.floor(Math.random() * 30) + 20;
    $ctrl.randPiggyUse = 1;
    $ctrl.randDonateUse = 1;
    $ctrl.numberOfEvents;

    getEverything();
    console.log($ctrl.eventObj);
    $ctrl.selectOption = function(price, mood) {
      //  console.log(amount);
      FoodFightService.changeProgressBar(price);
      FoodFightService.changeAmount(price);
      FoodFightService.sendMood(mood);
      getEverything();
    };

    $ctrl.piggyBank = function() {
      if ($ctrl.randPiggyUse > 0) {
        let randPiggyHolder = $ctrl.randPiggy;
        FoodFightService.breakPiggy(randPiggyHolder);
        $ctrl.progressBar = FoodFightService.getProgressBar();
        $ctrl.amount = FoodFightService.getAmount();
        $(".mainProgress").attr("value", $ctrl.amount);
        $(".mainProgress").attr("max", randPiggyHolder + 150);
        $ctrl.randPiggyUse--;
        $(".piggy")
          .find("img")
          .attr("src", "dependencies/piggy-bank-used.svg");
        $(".piggy").css("border", "3px solid grey");
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
        $(".mainProgress").attr("max", randDonateHolder + 150);
        $ctrl.randDonateUse--;
        $(".blood")
          .find("img")
          .attr("src", "dependencies/blood-sample-used.svg");
        $(".blood").css("border", "3px solid grey");
      } else {
        //end goal=> show div with error
        alert("You've already given blood!");
      }
    };


    function getEverything() {
      $ctrl.numberOfEvents = FoodFightService.getNumberOfEvents();
      if ($ctrl.usedEvents.length == $ctrl.numberOfEvents) {
        FoodFightService.getEvents().then(event => {
          if (event.repeatability === true) {
            $ctrl.eventObj = event;
            $ctrl.progressBar = FoodFightService.getProgressBar();
            $ctrl.amount = FoodFightService.getAmount();
            if ($ctrl.amount <= 0) {
              $location.path("/results");
            }
            $ctrl.dayCount = FoodFightService.changeDayCount();
            $ctrl.moodCurrent = FoodFightService.getMood();
            $(".mainProgress").attr("value", $ctrl.amount);
            $(".moodProgress").attr("value", $ctrl.moodCurrent);
            var windowWidth = $(window).width();
            if (windowWidth < 480) {
              cashMinItems();
            } else {
              cashMenuItems();
            }
            moodIcon();
          } else {
            getEverything();
          }
        });
      } else {
        FoodFightService.getEvents().then(event => {
          if ($ctrl.usedEvents.indexOf(event.id) == -1) {
            $ctrl.progressBar = FoodFightService.getProgressBar();
            $ctrl.amount = FoodFightService.getAmount();
            if ($ctrl.amount <= 0) {
              $location.path("/results");
            }
            $ctrl.dayCount = FoodFightService.changeDayCount();
            $ctrl.moodCurrent = FoodFightService.getMood();
            $(".mainProgress").attr("value", $ctrl.amount);
            $(".moodProgress").attr("value", $ctrl.moodCurrent);
            var windowWidth = $(window).width();
            if (windowWidth < 480) {
              cashMinItems();
            } else {
              cashMenuItems();
            }
            moodIcon();
          } else {
            getEverything();
          };
        });
      }
    }

    function cashMenuItems() {
      $(".needCashMenu").css("width", "135px");
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

    function moodIcon() {
      $(".emotionWriteTo").empty();
      if ($ctrl.moodCurrent >= 10) {
        $(".emotionWriteTo").html('<i class="material-icons">mood</i>');
      } else if ($ctrl.moodCurrent >= 7) {
        $(".emotionWriteTo").html(
          '<i class="material-icons">sentiment_satisfied</i>'
        );
      } else if ($ctrl.moodCurrent >= 4) {
        $(".emotionWriteTo").html(
          '<i class="material-icons">sentiment_neutral</i>'
        );
      } else if ($ctrl.moodCurrent >= 2) {
        $(".emotionWriteTo").html(
          '<i class="material-icons">sentiment_dissatisfied</i>'
        );
      } else {
        $(".emotionWriteTo").html('<i class="material-icons">mood_bad</i>');
      }
    }

    $(".formFocus").hide();
    $(".creditForm").hide();
    $ctrl.showDonate = function() {
      $(".formFocus").fadeIn(400);
      $(".creditForm").fadeIn(400);
    };
    $ctrl.close = function() {
      $(".formFocus").hide();
      $(".creditForm").hide();
    };
  }
  angular.module("App").controller("controllerFunction", controllerFunction);
})();
