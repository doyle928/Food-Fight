(function() {
  function FoodFightService($http) {
    var creditCard;
    var progressValue = 150;
    var dollarValue = 150;
    var dayCount = 1;
    var currentMood = 10;
    var numberOfEvents = 15;
    var enteredCred;
    var userCred = {
      username: "admin",
      password: "password"
    };
    var loggedIn = false;
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
      getMood: getMood,
      addEvent: addEvent,
      getNumberOfEvents: getNumberOfEvents,
      checkCreds: checkCreds,
      checkifLog: checkifLog,
      resetValues: resetValues,
      getCreditCard: getCreditCard,
      sendCreditCard: sendCreditCard
    };

    function getCreditCard(credit){
      creditCard = credit;
    }

    function sendCreditCard(){
      return creditCard;
    }

    function resetValues() {
      progressValue = 150;
      dollarValue = 150;
      dayCount = 1;
      currentMood = 10;
    }

    function checkifLog() {
      return loggedIn;
    }
    function checkCreds(entered) {
      if (entered.username == userCred.username) {
        if (entered.password == userCred.password) {
          loggedIn = true;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    function getNumberOfEvents() {
      return numberOfEvents;
    }

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
      if (dayCount == 1) {
        return 11;
      } else {
        return Math.floor(Math.random() * numberOfEvents) + 1;
      }
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
          return response.data[randNum()];
        })
        .catch(function(err) {
          //console.log(err);
        });
    }

    function addEvent(newEvent) {
      return $http({
        url: "/events",
        method: "POST",
        data: newEvent
      })
        .then(function(response) {
          return response;
        })
        .catch(function(err) {
          console.log("ERROR");
        });
    }
  }
  angular.module("App").factory("FoodFightService", FoodFightService);
})();
