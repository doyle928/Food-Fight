(function() {
  var donateComponent = {
    templateUrl: "Partials/donate.html",
    controller: function($location, $scope) {
      const $ctrl = this;
      $ctrl.home = function() {
        $location.path("/welcome");
      };

      function updateSize() {
        $ctrl.windowWidth = $(window).width();
      }
      $(document).ready(updateSize);
      $(window).resize(updateSize);

      $ctrl.start = function() {
        $location.path("/events");
      };

      $ctrl.titleNavButton = function() {
        if ($ctrl.windowWidth <= 767) {
          $(".titleNav").css("width", "125px");
          $(".titleMain").css("margin-left", "125px");
          if ($ctrl.windowWidth >= 480) {
            $(".priorityButton").css("left", "calc(10vw + 125px)");
            $(".secondaryButton").css("left", "calc(10vw + 125px)");
          } else {
            $(".priorityButton").css("left", "calc(50% + 125px)");
          }
        } else {
          $(".titleNav").css("height", "48px");
          $(".titleMain").css("margin-top", "48px");
          $(".titleIcons")
            .find("i")
            .css("top", "16px");
          $(".welcomeButtons").css("transform", "translateY(48px)");
        }
      };
      $(".welcomeContainer").on("click", function() {
        if ($ctrl.windowWidth <= 767) {
          $(".titleNav").css("width", "0");
          $(".titleMain").css("margin-left", "0");
          if ($ctrl.windowWidth >= 480) {
            $(".priorityButton").css("left", "10vw");
            $(".secondaryButton").css("left", "10vw");
          } else {
            $(".priorityButton").css("left", "50%");
          }
        } else {
          $(".titleNav").css("height", "0");
          $(".titleMain").css("margin-top", "0px");
          $(".titleIcons")
            .find("i")
            .css("top", "-32px");
          $(".welcomeButtons").css("transform", "translateY(0)");
        }
      });

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
  angular.module("App").component("donateComponent", donateComponent);
})();
