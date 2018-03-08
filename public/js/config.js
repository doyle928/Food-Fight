(function() {
  angular.module("App").config(function($routeProvider) {
    $routeProvider
      .when("/welcome", {
        template: "<start-component></start-component>"
      })
      .when("/events", {
        template: "<event-component></event-component>"
      })
      .when("/results", {
        template: "<results-component></results-component>"
      })
      .when("/donate", {
        template: "<donate-component></donate-component>"
      })
      .otherwise({ redirectTo: "/welcome" });
  });
})();
