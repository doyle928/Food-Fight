(function() {
  var addComponent = {
    templateUrl: "Partials/addEvent.html",
    controller: function(FoodFightService, $location) {
      const $ctrl = this;

      $ctrl.titleNavButton = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $("#addContent").css("padding-top", "70px");
      };
      $("#addMain").on("click", function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $("#addContent").css("padding-top", "40px");
      });

      $ctrl.onSwipeUp = function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $("#addContent").css("padding-top", "40px");
      };
      $ctrl.onSwipeDown = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $("#addContent").css("padding-top", "70px");
      };

      if (FoodFightService.checkifLog() == false) {
        $location.path("/login");
      }
      $ctrl.home = function() {
        $location.path("/welcome");
      };
      $ctrl.newEvent = {};
      $ctrl.addEvent = function(newEvent) {
        // FoodFightService.addEvent(newEvent).then(function(response) {
        // $ctrl.newEvent = response.data;
        console.log(newEvent);
      };
    }
  };
  angular.module("App").component("addComponent", addComponent);
})();
