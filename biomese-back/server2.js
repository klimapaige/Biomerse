const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const MongoClient = require('mongodb').MongoClient;
const biomerseRoutes = express.Router();
const cors = require('cors');
var corsOptions = {
    origin: false,
}
//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('scripts'));
var db

MongoClient.connect('mongodb://127.0.0.1:27017',{useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('biomerseDB') // whatever your database name is
  app.listen(PORT, () => {
    console.log('listening on 4000')
  })
})

//connection route
biomerseRoutes.route('/').get(function (req, res) {
    res.status(200).json({ 'Connection': 'connected to server successfully' })
});

//interacion routes
biomerseRoutes.route('/interaction/:id').get(cors(corsOptions),function(req, res){
    var id = req.params.id;
    res.status(200);
    var cursor = db.collection('Interactions').find({'interaction_id':id}).toArray(function(err, results) {
        //res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.status(200).json(results);
    })
});
biomerseRoutes.route('/interaction').get(cors(corsOptions),function(req, res){
    var cursor = db.collection('Interactions').find().toArray(function(err, results) {
        //res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.status(200).json(results);
    })
});

//process routes
biomerseRoutes.route('/process/:id').get(function(req, res){
    var cursor = db.collection('Processes').find().toArray(function(err, results) {
        res.status(200).json(results);
    })
});
biomerseRoutes.route('/process').get(function(req, res){
    var cursor = db.collection('Processes').find().toArray(function(err, results) {
        res.status(200).json(results);
    })
});

//script routes
biomerseRoutes.route('/script/xeogl').get(cors(corsOptions),function(req, res){
    var id = req.params.id;
    res.status(200);
    res.sendFile(__dirname+'/scripts/xeogl/xeogl.js');
});
biomerseRoutes.route('/script/interaction/:id').get(cors(corsOptions),function(req, res){
    var id = req.params.id;
    res.status(200);
    res.sendFile(`${__dirname}/scripts/interaction/interaction${id}.js`);
});

app.use('/biomerse', biomerseRoutes);

