const params = {
    'urlSite' : 'http://localhost:5000/',
    'databaseURI' : "mongodb://localhost:27017/trackpricesdb"
    } 
    
    const email = {
        service: 'gmail',
        auth: {
          user: 'username@gmail.com',
          pass: 'pass'
        },
        from:'********@gmail.com' ,
        to: '*********@live.fr',
        subject: "A new evidence was found",
        text: "Check it on the website"
      };
      
      module.exports = {
        email,
        params
      };