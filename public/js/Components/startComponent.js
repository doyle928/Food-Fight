(function() {
  var startComponent = {
    templateUrl: "Partials/start.html",
    controller: function($location, FoodFightService) {
      const $ctrl = this;
      $ctrl.windowWidth;
      FoodFightService.resetValues();

      function updateSize() {
        $ctrl.windowWidth = $(window).width();
      }
      $(document).ready(updateSize);
      $(window).resize(updateSize);

      $ctrl.start = function() {
        FoodFightService.resetValues();
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
          $(".titleMain").css("padding-top", "48px");
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
          $(".titleMain").css("padding-top", "0px");
          $(".titleIcons")
            .find("i")
            .css("top", "-32px");
          $(".welcomeButtons").css("transform", "translateY(0)");
        }
      });

      $ctrl.onSwipeRight = function() {
        if ($ctrl.windowWidth <= 767) {
          $(".titleNav").css("width", "125px");
          $(".titleMain").css("margin-left", "125px");
          if ($ctrl.windowWidth >= 480) {
            $(".priorityButton").css("left", "calc(10vw + 125px)");
            $(".secondaryButton").css("left", "calc(10vw + 125px)");
          } else {
            $(".priorityButton").css("left", "calc(50% + 125px)");
          }
        }
      };

      $ctrl.onSwipeLeft = function() {
        if ($ctrl.windowWidth <= 767) {
          $(".titleNav").css("width", "0");
          $(".titleMain").css("margin-left", "0");
          if ($ctrl.windowWidth >= 480) {
            $(".priorityButton").css("left", "10vw");
            $(".secondaryButton").css("left", "10vw");
          } else {
            $(".priorityButton").css("left", "50%");
          }
        }
      };
      $ctrl.onSwipeUp = function() {
        if ($ctrl.windowWidth >= 768) {
          $(".titleNav").css("height", "0");
          $(".titleMain").css("margin-top", "0px");
          $(".titleIcons")
            .find("i")
            .css("top", "-32px");
          $(".welcomeButtons").css("transform", "translateY(0)");
        } else if ($ctrl.windowWidth <= 480) {
          FoodFightService.resetValues();
          $location.path("/events");
        }
      };

      $ctrl.onSwipeDown = function() {
        if ($ctrl.windowWidth >= 768) {
          $(".titleNav").css("height", "48px");
          $(".titleMain").css("margin-top", "48px");
          $(".titleIcons")
            .find("i")
            .css("top", "16px");
          $(".welcomeButtons").css("transform", "translateY(48px)");
        }
      };
    }
  };

  angular.module("App").component("startComponent", startComponent);
})();
