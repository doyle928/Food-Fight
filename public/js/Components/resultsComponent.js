(function() {
  var resultsComponent = {
    templateUrl: "Partials/results.html",
    controller: function(FoodFightService, $location, $scope) {
      const $ctrl = this;
      $ctrl.dayCount = FoodFightService.getDayCount();
      $ctrl.donate = function() {
        $location.path("/donate");
      };

      $ctrl.titleNavButton = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $(".mainResult").css("margin-top", "70px");
      };
      $(".mainResult").on("click", function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $(".mainResult").css("margin-top", "40px");
      });

      $(".formFocus").hide();
      $(".creditForm").hide();
      setTimeout(function() {
        $(".formFocus").fadeIn(400);
        $(".creditForm").fadeIn(400);
      }, 7500);
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
    }
  };
  angular.module("App").component("resultsComponent", resultsComponent);
})();
