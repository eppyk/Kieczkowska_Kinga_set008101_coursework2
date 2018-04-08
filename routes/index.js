var express = require('express');
var router = express.Router();
const posts = require('../controllers/post.controller.js');

// GET the home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// GET the posts page
router.get('/posts', posts.findAll);

// DELETE a post
router.post('/uposts', posts.deleteOne);

// UPDATE a post
router.post('/upposts', posts.update);

// GET the add post site
router.get('/postform', function(req, res, next) {
  res.render('addpost', { title: 'Posts' });
});

//create a new post
router.post('/posts', posts.create);


module.exports = router;
