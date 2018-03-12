(function() {
    var addComponent = {
        templateUrl: "Partials/addEvent.html",
        controller: function(FoodFightService, $location) {
            const $ctrl = this;
            $ctrl.home = function() {
                $location.path("/welcome");
            };
            $ctrl.addEvent = function (newEvent){
                FoodFightService.addEvent(newEvent);
                console.log(newEvent);
            }
        }
    }
    angular.module("App").component("addComponent", addComponent);
})();