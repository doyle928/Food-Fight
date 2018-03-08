(function() {
  function FoodFightService($http) {
    var progressValue = 150;
    var dollarValue = 150;
    var dayCount = 1;
    var event = {
      eventName: "I'm an event",
      text: "You've been hit with an event. Choose a thing.",
      option1: "I'm option1",
      option1price: 10,
      option2: "I'm option2",
      option2price: 20
    };

    return {
      changeProgressBar: changeProgressBar,
      changeAmount: changeAmount,
      changeDayCount: changeDayCount,
      changeEvent: changeEvent,
      getProgressBar: getProgressBar,
      getAmount: getAmount,
      getEvents: getEvents
    };
    function changeProgressBar(progressBar) {
      progressValue -= progressBar;
      //console.log(progressValue);
    }
    function getProgressBar() {
      return progressValue;
    }
    function changeAmount(dollarAmount) {
      dollarValue -= dollarAmount;
      if (dollarValue <= 0) {
        dollarValue = 0;
      }
      //console.log(dollarValue);
    }
    function getAmount() {
      return dollarValue;
    }

    function changeDayCount() {
      return dayCount++;
    }

    function changeEvent() {
      return event;
    }
    function randNum() {
      return Math.floor(Math.random() * 10) + 1;
    }

  function getEvents() {
        return $http({
          method:"GET",
          url:"/events"
        }).then(function(response){
          //console.log("from service ",response.data);
          return response.data[randNum()];
        })
        .catch(function(err) {
          //console.log(err);
        });
    }
  }
  angular.module("App").factory("FoodFightService", FoodFightService);
})();
