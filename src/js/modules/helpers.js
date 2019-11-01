
  const helpers = {
    randomSleep: function randomSleep(minseconds,maxseconds) {
      sleep(Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds)
    },
    randomNumber: function randomNumber(minseconds,maxseconds) {
      return Math.floor(Math.random() * (maxseconds - minseconds + 1)) + minseconds
    },

}

exports.helpers;