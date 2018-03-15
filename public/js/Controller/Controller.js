(function() {
    function controllerFunction(FoodFightService, $location, $scope) {
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
        $ctrl.cc;

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
            if (event.eventname === "Grocery Shopping") {
                getEverything();
            } else if ($ctrl.usedEvents.length == ($ctrl.numberOfEvents-3)) {
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
                            $ctrl.eventObj = event;
                            $ctrl.usedEvents.push(event.id);
                            if ($ctrl.usedEvents.length === 11){
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




        function cashMenuItems() {
            $(".needCashMenu").css("width", "135px");
            $(".main").css("margin-left", "119px");
            $(".getCash").css("left", "119px");
            $(".topInfo").css("left", "119px");
            $("progress").css("left", "119px");
            $("footer").css("left", "calc(50% + 119px)");
            $(".cashGrabItems").css("left", "80px");
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
            $(".cashGrabItems").css("left", "0");
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
            if (isValid) {}
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
        // if ($ctrl.cc.ccnum1.length == 4) {
        //   if ($ctrl.cc.ccnum2.length == 4) {
        //     if ($ctrl.cc.ccnum3.length == 4) {
        //       if ($ctrl.cc.ccnum4.length == 4) {
        //         if (
        //           $ctrl.cc.ccname != undefined ||
        //           $ctrl.cc.ccname != undefined
        //         ) {
        //           if ($ctrl.cc.ccCCV.length == 3) {
        //             if ($ctrl.cc.exp1 != "") {
        //               if ($ctrl.cc.exp2 != "") {
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }

        // $(".submitCC")
        //   .find("span")
        //   .empty();
        // $(".submitCC")
        //   .find("span")
        //   .html('<i class="material-icons">lock_open</i>');
    }
    angular.module("App").controller("controllerFunction", controllerFunction);
})();