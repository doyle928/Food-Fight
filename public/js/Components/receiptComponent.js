(function() {
  var receiptComponent = {
    templateUrl: "Partials/receipt.html",
    controller: function(FoodFightService) {
      const $ctrl = this;
      FoodFightService.resetValues();
      $ctrl.cc = FoodFightService.sendCredit();
      console.log($ctrl.cc);

      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var currentdate = new Date();
      var month = currentdate.getMonth();
      var day = currentdate.getDate();
      $ctrl.date = months[month] + ", " + day;
      var nameHolder = $ctrl.cc.ccname.split(" ");
      $ctrl.name =
        nameHolder[0].charAt(0).toUpperCase() + nameHolder[0].slice(1);

      $ctrl.days = function() {
        var numHolder = Math.floor($ctrl.cc.value / (150 / 7));
        if (numHolder == 0) {
          numHolder = 1;
        }
        return numHolder;
      };

      $ctrl.titleNavButton = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $(".receiptMain").css("margin-top", "70px");
      };
      $("#receipt").on("click", function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $(".receiptMain").css("margin-top", "40px");
      });

      $ctrl.onSwipeUp = function() {
        $(".titleIconsElse").css("top", "0px");
        $(".titleNavElse").css("top", "-30px");
        $(".receiptMain").css("margin-top", "40px");
      };
      $ctrl.onSwipeDown = function() {
        $(".titleIconsElse").css("top", "30px");
        $(".titleNavElse").css("top", "0");
        $(".receiptMain").css("margin-top", "70px");
      };
    }
  };
  angular.module("App").component("receiptComponent", receiptComponent);
})();
