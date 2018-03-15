(function() {
  function controllerFunction(FoodFightService, $location, $scope, $element) {
    const $ctrl = this;
    $ctrl.eventObj = {};
    $ctrl.progressBar;
    $ctrl.amount;
    $ctrl.dayCount;
    $ctrl.moodCurrent;
    $ctrl.usedEvents = [1];
    $ctrl.randPiggy = Math.floor(Math.random() * 12) + 5;
    $ctrl.randDonate = Math.floor(Math.random() * 30) + 20;
    $ctrl.randPiggyUse = 1;
    $ctrl.randDonateUse = 1;
    $ctrl.numberOfEvents;
    $ctrl.windowWidth;
    $ctrl.cc;
    console.log($ctrl.usedEvents);

    getEverything();
    console.log($ctrl.eventObj);
    $ctrl.selectOption1 = function(price, mood) {
      if ($(".flipper1").hasClass("flipped")) {
        $(".flipper1").removeClass("flipped");
        getEverything();
        $(".flipper1").css("transform", "rotateY(0deg)");
      } else {
        $(".flipper1").addClass("flipped");
        FoodFightService.changeProgressBar(price);
        FoodFightService.changeAmount(price);
        FoodFightService.sendMood(mood);
        $(".flipper1").css("transform", "rotateY(180deg)");
      }
    };
    $ctrl.selectOption2 = function(price, mood) {
      if ($(".flipper2").hasClass("flipped")) {
        $(".flipper2").removeClass("flipped");
        getEverything();
        $(".flipper2").css("transform", "rotateY(0deg)");
      } else {
        FoodFightService.changeProgressBar(price);
        FoodFightService.changeAmount(price);
        FoodFightService.sendMood(mood);
        $(".flipper2").css("transform", "rotateY(180deg)");
        $(".flipper2").addClass("flipped");
      }
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
        $(".piggyError").css("visibility", "visible");
      }
      if ($ctrl.windowWidth < 480) {
        cashMinItems();
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
        $(".donateError").css("visibility", "visible");
      }
      if ($ctrl.windowWidth < 480) {
        cashMinItems();
      }
    };
    $ctrl.closePiggyError = function(){
      $(".piggyError").css("visibility", "hidden");
    }
    $ctrl.closeDonateError = function(){
      $(".donateError").css("visibility", "hidden");
    }

    function getEverything() {
      $ctrl.numberOfEvents = FoodFightService.getNumberOfEvents();
      if (event.eventname === "Grocery Shopping") {
        getEverything();
      } else if ($ctrl.usedEvents.length == $ctrl.numberOfEvents - 3) {
        console.log("used events = number of events");
        FoodFightService.getEvents().then(event => {
          if (event == undefined || event.id == 1) {
            getEverything();
          } else {
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
          }
        });
      } else {
        FoodFightService.getEvents().then(event => {
          if (event != undefined) {
            if ($ctrl.usedEvents.indexOf(event.id) == -1) {
              console.log("Got here");
              $ctrl.eventObj = event;
              $ctrl.usedEvents.push(event.id);
              console.log($ctrl.usedEvents.length);
              if ($ctrl.usedEvents.length === 11) {
                $ctrl.usedEvents = [1];
              }
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
          } else {
            getEverything();
          }
        });
      }
    }

    $ctrl.titleNavButton = function() {
      $(".titleNavEvent").css("top", "0");
      $(".titleNavEvent").attr("class", "titleNavEvent down");
      if ($(".titleNavEvent").hasClass("titleNavEvent down")) {
        $(".main").css("margin-top", "30px");
        if ($ctrl.windowWidth < 480) {
          $(".titleIconsEvent").css("top", "34px");
          $(".topInfo").css("top", "20px");
        } else {
          $(".titleIconsEvent").css("top", "36px");
          $(".topInfo").css("top", "10px");
        }
        $(".mainProgress").css("top", "30px");
      }
    };
    $(".main").on("click", function() {
      $(".titleNavEvent").css("top", "-30px");
      if ($(".titleNavEvent").hasClass("down")) {
        $(".main").css("margin-top", "0px");
        if ($ctrl.windowWidth < 480) {
          $(".topInfo").css("top", "-5px");
          $(".titleIconsEvent").css("top", "4px");
        } else {
          $(".topInfo").css("top", "-20px");
          $(".titleIconsEvent").css("top", "6px");
        }
        $(".mainProgress").css("top", "0");
        $(".titleNavEvent").removeClass("down");
      }
    });

    function cashMenuItems() {
      $(".needCashMenu").css("width", "120px");
      $(".main").css("margin-left", "117px");
      $(".getCashBorder").css("left", "117px");
      $(".topInfo").css("left", "117px");
      $(".titleNavEvent").css("margin-left", "117px");
      $("progress").css("left", "117px");
      $("footer").css("left", "calc(50% + 117px)");
      $(".needCashMenu")
        .find("li")
        .css("margin-left", "0");
      $(".cashGrabItems").css("left", "-10px");
    }

    $ctrl.cashMenu = function() {
      var windowWidth = $(window).width();
      windowWidth = parseInt(windowWidth);
      if (windowWidth < 480) {
        cashMenuItems();
      } else {
        console.log("viewport too big");
      }
    };

    function cashMinItems() {
      $(".needCashMenu").css("width", "0");
      $(".main").css("margin-left", "0px");
      $(".getCashBorder").css("left", "0");
      $(".topInfo").css("left", "0");
      $(".titleNavEvent").css("margin-left", "0");
      $("progress").css("left", "0");
      $("footer").css("left", "50%");
      $(".needCashMenu")
        .find("li")
        .css("margin-left", "-80px");
      $(".cashGrabItems").css("left", "-150px");
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
      $ctrl.windowWidth = $(window).width();
      if ($ctrl.windowWidth < 480) {
        $(".card1").removeAttr("data-tilt");
        $(".card2").removeAttr("data-tilt");
        $(".titleIconsEvent").css("left", "50%");
        $(".titleIconsEvent").css("top", "4px");
        $(".liSpan1").css("visibility", "visible");
        $(".liSpan2").css("visibility", "visible");
        $(".getCashBorder").css("visibility", "visible");
        cashMinItems();
      } else {
        $(".card1").attr("data-tilt");
        $(".card2").attr("data-tilt");
        $(".titleIconsEvent").css("left", "calc(50% + 60px)");
        $(".titleIconsEvent").css("top", "6px");
        $(".liSpan1").css("visibility", "hidden");
        $(".liSpan2").css("visibility", "hidden");
        $(".getCashBorder").css("visibility", "hidden");
        $(".piggy").on("mouseover", function() {
          $(".liSpan1").css("visibility", "visible");
        });
        $(".piggy").on("mouseleave", function() {
          $(".liSpan1").css("visibility", "hidden");
        });

        $(".blood").on("mouseover", function() {
          $(".liSpan2").css("visibility", "visible");
        });
        $(".blood").on("mouseleave", function() {
          $(".liSpan2").css("visibility", "hidden");
        });
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
    // $ctrl.facebook = function(){
    //   $location.path("")
    // }

    $scope.slider = {
      value: 0,
      options: {
        floor: 0,
        ceil: 100,
        showTicks: 5,
        showSelectionBar: true,
        translate: function(value) {
          return "$" + value;
        }
      }
    };

    // $ctrl.submitForm();

    $ctrl.submitForm = function(isValid) {
      if (isValid) {
      }
    };

    // ccBoolean
    $(".lockChange").on("keyup", function() {
      $ctrl.ccBoolean = {
        value: $scope.slider.value,
        ccnum1: false,
        ccnum2: false,
        ccnum3: false,
        ccnum4: false,
        ccname: false,
        exp1: false,
        exp2: false,
        ccCCV: false
      };
      var ccnum1Val = $(".ccnum1").val();
      var ccnum2Val = $(".ccnum2").val();
      var ccnum3Val = $(".ccnum3").val();
      var ccnum4Val = $(".ccnum4").val();
      var ccnameVal = $(".ccname").val();
      var ccexp1Val = $(".ccselect1").val();
      var ccexp2Val = $(".ccselect2").val();
      var ccvVal = $(".ccCCV").val();
      if (
        ccnum1Val.length == 4 &&
        ccnum2Val.length == 4 &&
        ccnum3Val.length == 4 &&
        ccnum4Val.length == 4 &&
        ccnameVal != "" &&
        ccexp1Val != "" &&
        ccexp2Val != "" &&
        ccvVal.length == 3
      ) {
        $ctrl.ccBoolean.ccnum1 = true;
        $ctrl.ccBoolean.ccnum2 = true;
        $ctrl.ccBoolean.ccnum3 = true;
        $ctrl.ccBoolean.ccnum4 = true;
        $ctrl.ccBoolean.ccname = true;
        $ctrl.ccBoolean.exp1 = true;
        $ctrl.ccBoolean.exp2 = true;
        $ctrl.ccBoolean.ccCCV = true;
      } else {
        $(".submitCC")
          .find("span")
          .empty()
          .html('<i class="material-icons">lock_outline</i>');
      }

      if (
        $ctrl.ccBoolean.value != 0 &&
        $ctrl.ccBoolean.ccnum1 == true &&
        $ctrl.ccBoolean.ccnum2 == true &&
        $ctrl.ccBoolean.ccnum3 == true &&
        $ctrl.ccBoolean.ccnum4 == true &&
        $ctrl.ccBoolean.ccname == true &&
        $ctrl.ccBoolean.exp1 == true &&
        $ctrl.ccBoolean.exp2 == true &&
        $ctrl.ccBoolean.ccCCV == true
      ) {
        $(".submitCC")
          .find("span")
          .empty();
      }
    });

    $ctrl.onSwipeRight = function() {
      var windowWidth = $(window).width();
      windowWidth = parseInt(windowWidth);
      if (windowWidth < 480) {
        cashMenuItems();
      } else {
        console.log("viewport too big");
      }
    };
    $ctrl.onSwipeLeft = function() {
      let windowWidth = $(window).width();
      windowWidth = parseInt(windowWidth);
      if (windowWidth < 480) {
        cashMinItems();
      } else {
        console.log("viewport too big");
      }
    };
    $ctrl.onSwipeUp = function() {
      $(".titleNavEvent").css("top", "-30px");
      if ($(".titleNavEvent").hasClass("down")) {
        $(".main").css("margin-top", "0px");
        if ($ctrl.windowWidth < 480) {
          $(".topInfo").css("top", "-5px");
          $(".titleIconsEvent").css("top", "4px");
        } else {
          $(".topInfo").css("top", "-20px");
          $(".titleIconsEvent").css("top", "6px");
        }
        $(".mainProgress").css("top", "0");
        $(".titleNavEvent").removeClass("down");
      }
    };
    $ctrl.onSwipeDown = function() {
      $(".titleNavEvent").css("top", "0");
      $(".titleNavEvent").attr("class", "titleNavEvent down");
      if ($(".titleNavEvent").hasClass("titleNavEvent down")) {
        $(".main").css("margin-top", "30px");
        if ($ctrl.windowWidth < 480) {
          $(".titleIconsEvent").css("top", "34px");
          $(".topInfo").css("top", "20px");
        } else {
          $(".titleIconsEvent").css("top", "36px");
          $(".topInfo").css("top", "10px");
        }
        $(".mainProgress").css("top", "30px");
      }
    };
  }
  angular.module("App").controller("controllerFunction", controllerFunction);
})();