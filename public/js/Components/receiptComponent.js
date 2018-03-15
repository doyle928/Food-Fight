(function() {
  var receiptComponent = {
    templateUrl: "Partials/receipt.html",
    controller: function(FoodFightService){
      const $ctrl = this;
      $ctrl.cc = FoodFightService.sendCreditCard();
    }
	};
  angular
    .module("App")
    .component("receiptComponent", receiptComponent);
})();
