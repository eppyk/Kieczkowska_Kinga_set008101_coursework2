var express = require('express');

const MongoClient = require('mongodb').MongoClient, assert = require('assert');
//const MONGO_URL = <insert valid mongodb URL>

exports.create = (req, res) => {
 MongoClient.connect(MONGO_URL, (err,db) => {
   if (err) {
     return console.log(err);
   };
   db.collection('posts').insertOne(
     {
       title: req.body.post_title || "Untitled Post",
       text: req.body.post_content
     },
     function (err, res) {
       if (err) {
         db.close();
         return console.log(err);
       }

       db.close();
     }
   );
   return res.render('postchanged', {result: "worked", title: req.body.post_title, action:"saved."})
 })

};

// Retrieve and return all posts from the database.
exports.findAll = (req, res) => {
  MongoClient.connect(MONGO_URL, (err,db) => {
    if (err) {
      return console.log(err);
    };
    db.collection('posts').find().toArray(function(err, data) {
      return res.render('posts', { posts: data });
  });


db.close();
})
};


exports.deleteOne = (req, res) => {
  MongoClient.connect(MONGO_URL, (err,db) => {
    if (err) {
      return console.log(err);
    };

    db.collection('posts').deleteOne({title: req.body.post_title}, function(err, obj) {
    if (err) throw err;
    if (obj.result.n == 1) {
      return res.render('postchanged', {result: "worked", title: req.body.post_title, action:"deleted."});
    } else {
      return res.render('postchanged', {result: "didn't work", title: req.body.post_title, action:"lost in the universe :( Are you sure it exists? "});
    };
    db.close();
  });
});
};

exports.update = (req, res) => {
  MongoClient.connect(MONGO_URL, (err,db) => {
    if (err) {
      return console.log(err);
    };
    db.collection('posts').update({title: req.body.post_title}, {$set:{text: req.body.post_content}}, function(err, obj) {
    if (err) throw err;
    if (obj.result.n == 1) {
      return res.render('postchanged', {result: "worked", title: req.body.post_title, action:"updated."});
    } else {
      return res.render('postchanged', {result: "didn't work", title: req.body.post_title, action:"lost in the universe :( Are you sure it exists?"});
    };
    db.close();
  });
  });
};
