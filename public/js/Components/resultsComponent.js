(function() {
  var resultsComponent = {
    templateUrl: "Partials/results.html",
    controller: function($location) {
      const $ctrl = this;
      $ctrl.donate = function() {
        $location.path("/donate");
      };
    }
  };
  angular.module("App").component("resultsComponent", resultsComponent);
})();
