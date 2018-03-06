(function() {
  var startComponent = {
    templateUrl: "Partials/start.html",
    controller: function($location) {
      const $ctrl = this;
      $ctrl.start = function() {
        $location.path("/events");
      };
    }
  };

  angular.module("App").component("startComponent", startComponent);
})();
