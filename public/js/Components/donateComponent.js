(function() {
    var donateComponent = {
        templateUrl: "Partials/donate.html",
        controller: function($location) {
            const $ctrl = this;
            $ctrl.home = function() {
                $location.path("/welcome");
            };
        }
    }
    angular.module("App").component("donateComponent", donateComponent);
})();