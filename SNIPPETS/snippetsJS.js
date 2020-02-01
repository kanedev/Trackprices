console.log = function(message) {
    document.getElementById('result').innerHTML = message;
};
console.log('your result');
//--------------------------------------------------------------------------------
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

  //---------------------------------------------------------------------------------
  function test(){
    return new Promise((resolve, reject) => {
           setTimeout(() => {
 resolve(2000)
}, 5000);
       })
   
   
}

async function asyncCall() {
   var a=100;
   console.log('a = ',a)
   var b = await test();
   var c=300;
 
   console.log('b = ',b)
   console.log('c = ',c)
 }
 asyncCall()

 //--------------------------------------------------------------------------------

// How to execute functions sequentially using Node Js Promise?
print();

function print(){
    first('first')
    .then(second)
    .then(third);
}

function first(a){
    return new Promise((resolve, reject) => {
    		console.log(a);
        resolve(a);  
    });
}

function second(b){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      		console.log("second");
      		resolve(b);
      }, 2000);  
    })
}


    function third(c){
      return new Promise((resolve, reject) => {
        console.log("third");
          var res1 = function (){
            console.log("third");
              resolve(c);
          }    
      });
     // console.log(c);
  } 















