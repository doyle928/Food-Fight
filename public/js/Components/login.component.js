(function() {
  var logIn = {
    templateUrl: "Partials/login.html",
    controller: function(FoodFightService, $location) {
      const $ctrl = this;
      $ctrl.user;

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
