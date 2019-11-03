const router = require('express').Router()
// Models
 const Post = require('../models/post')
 const User = require('../models/user')
 const product =  require ('../modules/Alicheck');
 //import params from '../config/params';

// GET  - retrieve data from the server
// POST - send data to the server
// PUT  - update data in the server
// DELETE - delete data in the server




// POST /api/posts : Create a new post
router.post('/', function(req, res, next) {
    // Database Operation: create new post

    // Cleaning the URL 
    let urlProduct = req.body.content.split('?');

    // let post = new Post({
    //     title:   req.body.title,
    //     content: urlProduct[0]
    // })
    let post = new Post({
        title:   req.body.title,
        content: urlProduct[0]
    })


//scrap data from the url

 
    let productData = product.scrapeProduct(urlProduct[0]);

productData.then(item => {

    console.log(item.price)
 

    })
 









 //   Save the post into the DB
    post.save(function(err, data) {
        if (err || !data) {
            console.log("ERROR:", err)
            res.json({error: err})
            return;
        }
     //  console.log(post.title + " saved to posts collection."); 
       // res.json(data)
    })
   // res.json({message: 'Successfully updated'})

  // res.send('Adding your new post ...')
  res.redirect('/');
//    res.status(200).json({
//     success:true,
//     redirectUrl: '/'
// })


})



// GET /api/posts/2134 : (Read) return a post 
router.get('/:postId', function(req, res, next) {
    // Database Operation: get post where _id = postId
    let id = req.params.postId
    Post.findById(id, function(err, data) {
        if (err || !data) {
            console.log(err)
            return;
        }
        res.json(data)
    })
})


// PUT /api/posts/1242 : Update a post
router.put('/:postId', function(req, res, next) {
    // Database Operation: modify an existing post
    let id = req.params.postId
    Post.findByIdAndUpdate(id,{$set: req.body}, function(err, data) {
        if (err || !data) {
            console.log("ERROR:", err)
            res.json({error: err})
            return;
        }
    //   res.json({data, message: 'Successfully updated'})
    res.json({error:false,message: 'Successfully updated'})
    // res.redirect('/');
    })
 
  // res.redirect('http://localhost:5000');
   //res.send('Update the book');

  // res.redirect(req.baseUrl + '/');
})

// DELETE /api/posts/1428 : Delete a post
router.delete('/:postId', function(req, res, next) {
    // Database Operation: delete an existing post
    let id = req.params.postId
    Post.findByIdAndRemove(id, function(err, data) {
        if (err) {
            console.log("ERROR:", err)
            res.json({error: err})
            return;
        }
        res.json({error: false}) // success!
    })
})




// GET /api/posts : return All post
router.get('/', function(req, res, next) {
    // Database Operation: get all posts from the database
    let offset = Number(req.query.offset);
    let limit  = Number(req.query.limit);
    if (limit == 0) {
        limit = Number.MAX_SAFE_INTEGER;
    }
    Post.find({},function(err, data) {
        if (err || !data) {
            console.log(err)
            return;
        }
     //   res.json(data)
    })  .sort({publishDate : -1 })
        .skip(offset)
        .limit(limit)  
        .then((data) => {
        res.json(data)
    })
})



module.exports = router;



