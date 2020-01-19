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