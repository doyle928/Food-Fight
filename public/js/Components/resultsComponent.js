(function() {
  var resultsComponent = {
    templateUrl: "Partials/results.html",
    controller: function(FoodFightService, $location) {
      const $ctrl = this;
      $ctrl.dayCount = FoodFightService.getDayCount();
      $ctrl.donate = function() {
        $location.path("/donate");
      };
    }
  };
  angular.module("App").component("resultsComponent", resultsComponent);
})();
