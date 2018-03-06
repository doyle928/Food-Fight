(function() {
  function FoodFightService($http) {
    var progressValue = 150;
    var dollarValue = 150;
    var dayCount = 1;
    var event = {
      eventName: "I'm an event",
      text: "You've been hit with an event. Choose a thing.",
      option1: "I'm option1",
      option1Price: 10,
      option2: "I'm option2",
      option2Price: 20
    };

    return {
      changeProgressBar: changeProgressBar,
      changeAmount: changeAmount,
      changeDayCount: changeDayCount,
      changeEvent: changeEvent,
      getProgressBar: getProgressBar,
      getAmount: getAmount
    };
    function changeProgressBar(progressBar) {
      progressValue -= progressBar;
      console.log(progressValue);
    }
    function getProgressBar() {
      return progressValue;
    }
    function changeAmount(dollarAmount) {
      dollarValue -= dollarAmount;
      if (dollarValue <= 0) {
        dollarValue = 0;
      }
      console.log(dollarValue);
    }
    function getAmount() {
      return dollarValue;
    }

    function changeDayCount() {
      return dayCount++;
    }
    function randNum() {
      return Math.floor(Math.random() * 6) + 1;
    }

    function getEvents() {
      return $http({
        method:'GET',
        url:'/Data/events.json'
      }).then(function(response){
        console.log("from service ",response.data);
        return response.data[randNum()];
      }).catch(function(err){
        console.log(err);
      });
    }
  }
    function breakPiggy(amount) {
      dollarValue += amount;
    }
    function donateBlood(amount) {
      dollarValue += amount;
    }
  }

  angular.module("App").factory("FoodFightService", FoodFightService);
})();
