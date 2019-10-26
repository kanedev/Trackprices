console.log = function(message) {
    document.getElementById('result').innerHTML = message;
};
console.log('your result');
-----------------------------------------------------
function randomSleep(maxseconds) {
    sleep(Math.floor(Math.random() * maxseconds))
  }

  var min = 10; 
  var max = 60; 
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 

  function randomSleep(minseconds,maxseconds) {
    sleep(Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds)
  }

  function randomNumber(minseconds,maxseconds) {
    return Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds
  }