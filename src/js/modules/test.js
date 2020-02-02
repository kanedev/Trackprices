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