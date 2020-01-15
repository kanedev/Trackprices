const params = {
    'urlSite' : 'http://localhost:5000/',
    'databaseURI' : "mongodb://localhost:27017/trackpricesdb"
    } 
    
    const email = {
        service: 'gmail',
        auth: {
          user: '*****@gmail.com',
          pass: '*******'
        },
        from:'******@gmail.com' ,
        to: '****@live.fr',
        subject: "PriceTracks : price was changed",
        html: "There is some price's update "
      };
      
      module.exports = {
        email,
        params
      };