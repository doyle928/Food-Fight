(function () {
	var startComponent = {
		templateUrl: "./partials/start.html",
		controller: function(){
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

