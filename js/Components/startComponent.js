(function () {
	var startComponent = {
		templateUrl: "Partials/start.html",
		controller: function($location){
			var $ctrl = this;
			$ctrl.start = function (){
				$location.path("/events");
			}
		}
	}

	angular
		.module("App")
		.component("startComponent", startComponent);
})();

