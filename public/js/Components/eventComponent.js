(function() {
  var eventComponent = {
    templateUrl: "Partials/event.html",
    controller: "controllerFunction"
  };
  angular
    .module("App")
    .component("eventComponent", eventComponent);
})();
