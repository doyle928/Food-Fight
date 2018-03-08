(function() {
  var startComponent = {
    templateUrl: "Partials/start.html",
    controller: function($location) {
      const $ctrl = this;
      $ctrl.start = function() {
        $location.path("/events");
      };
      $ctrl.titleNavButton = function() {
        $(".titleNav").css("width", "125px");
        $(".titleMain").css("margin-left", "125px");
      };
      $(".welcomeContainer").on("click", function() {
        $(".titleNav").css("width", "0");
        $(".titleMain").css("margin-left", "0");
      });  
    }
  };

  angular.module("App").component("startComponent", startComponent);
})();
