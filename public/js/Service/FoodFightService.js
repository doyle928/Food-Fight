(function() {
  function FoodFightService($http) {
    var progressValue = 150;
    var dollarValue = 150;
    var dayCount = 1;
    var currentMood = 10;
    var event = {
      eventName: "I'm an event",
      text: "You've been hit with an event. Choose a thing.",
      option1: "I'm option1",
      option1price: 10,
      option2: "I'm option2",
      option2price: 20,
      image: "images/forgotten-wallet.jpg",
      fact: "I'm a fact"
    };

    return {
      changeProgressBar: changeProgressBar,
      changeAmount: changeAmount,
      changeDayCount: changeDayCount,
      getProgressBar: getProgressBar,
      getAmount: getAmount,
      getEvents: getEvents,
      breakPiggy: breakPiggy,
      donateBlood: donateBlood,
      getDayCount: getDayCount,
      sendMood: sendMood,
      getMood: getMood
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
    function breakPiggy(amount) {
      dollarValue += amount;
    }
    function donateBlood(amount) {
      dollarValue += amount;
    }
    function randNum() {
      return Math.floor(Math.random() * 10) + 1;
    }
    function getDayCount() {
      return dayCount;
    }
    function sendMood(amount) {
      currentMood -= amount;
    }
    function getMood() {
      return currentMood;
    }

    function getEvents() {
      return $http({
        method: "GET",
        url: "/events"
      })
        .then(function(response) {
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
