(function() {
  var logIn = {
    templateUrl: "Partials/login.html",
    controller: function(FoodFightService, $location) {
      const $ctrl = this;
      $ctrl.user;

      $ctrl.titleNavButton = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $(".loginMain").css("margin-top", "80px");
      };
      $(".loginMain").on("click", function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $(".loginMain").css("margin-top", "50px");
      });

      $(".loginInput").on("keyup", function() {
        if ($(".loginUser").val() != "" && $(".loginPass").val() != "") {
          $(".loginMain")
            .find("span")
            .empty();
        } else {
          $(".loginMain")
            .find("span")
            .empty()
            .html('<i class="material-icons">lock_outline</i>');
        }
      });
      $ctrl.submitForm = function(isValid) {
        if (isValid) {
          var check = FoodFightService.checkCreds($ctrl.user);
          if (check == true) {
            $location.path("/add");
          } else {
            $(".loginMain")
              .find("p")
              .text("Username or password is invalid");
          }
        }
      };

      // FoodFightService.checkCreds();
    }
  };
  angular.module("App").component("logIn", logIn);
})();
