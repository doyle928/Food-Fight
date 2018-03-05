(function() {
  var eventComponent = {
    templateUrl: "partials/event.html"
  };
  angular
    .module("App");
    .component("eventComponent", eventComponent)
})();
