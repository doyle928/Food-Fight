(function(){
	var gameComponent = {
		templateUrl: "./partials/event.html",
		controller: "controllerFunction"
	};

	angular
		.module("App")
		.component("gameComponent", gameComponent);
})();