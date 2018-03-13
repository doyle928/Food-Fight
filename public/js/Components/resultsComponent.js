(function() {
  var resultsComponent = {
    templateUrl: "Partials/results.html",
    controller: function(FoodFightService, $location) {
      const $ctrl = this;
      $ctrl.dayCount = FoodFightService.getDayCount();
      $ctrl.donate = function() {
        $location.path("/donate");
      };
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
    }
  };
  angular.module("App").component("resultsComponent", resultsComponent);
})();
