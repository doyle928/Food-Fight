(function () {

	angular
	.module("App")
	.config(function($routeProvider){
		$routeProvider
		.when("/welcome", {
			template: "<welcome></welcome>"
		})
		.when("/events", {
			template: "<events></events>"
		})
		.when("/results"), {
			template: "<results></results>"
		}
		.otherwise({redirectTo: "/welcome"});
	});

})();