(function() {
  var teamComponent = {
    templateUrl: "Partials/team.html",
    controller: function(){
      const $ctrl = this;
      $ctrl.titleNavButton = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $("#teamDiv").css("margin-top", "80px");
      };
      $("#teamDiv").on("click", function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $("#teamDiv").css("margin-top", "50px");
      });

      $ctrl.onSwipeUp = function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $("#teamDiv").css("margin-top", "50px");
      };
      $ctrl.onSwipeDown = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $("#teamDiv").css("margin-top", "80px");
      };
    }
	};
  angular
    .module("App")
    .component("teamComponent", teamComponent);
})();
