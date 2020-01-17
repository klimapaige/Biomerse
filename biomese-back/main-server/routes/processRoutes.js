const express = require('express');
const app = express();
const biomerseRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

var db
MongoClient.connect('mongodb://127.0.0.1:27017',{useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('biomerseDB')
})

biomerseRoutes.route('/:id').get(function(req, res){
    var id = req.params.id;
    res.status(200);
    db.collection('Processes').find({'process_id':id}).toArray(function(err, results) {
        res.status(200).json(results);
    })
});

biomerseRoutes.route('/search/:word').get(function(req, res){
    var word = req.params.word;
    res.status(200);
    db.collection('Processes').find({process_name:new RegExp(`.*${word}.*`, 'i')}).toArray(function(err, results) {
        res.status(200).json(results);
    })
});

biomerseRoutes.route('/').get(function(req, res){
    db.collection('Processes').find().toArray(function(err, results) {
        res.status(200).json(results);
    })
});

module.exports = biomerseRoutes;