(function() {
  var teamComponent = {
    templateUrl: "Partials/team.html",
    controller: "controllerFunction"
	};
  angular
    .module("App")
    .component("teamComponent", teamComponent);
})();
