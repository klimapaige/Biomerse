const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const biomerseRoutes = express.Router();
const PORT = 4000;
let User = require('./user.model');
let Interaction = require('./interaction.model');
let Process = require('./process.model');
const cors = require('cors');
var corsOptions = {
    origin: false,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/biomerseDB', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

biomerseRoutes.route('/').get(function (req, res) {
    res.status(200).json({ 'Connection': 'connected to server successfully' })
});
biomerseRoutes.route('/interaction').get(function(req, res){
    let id = 1;
    Interaction.findById(id, function(err, todo) {
        res.json(todo);
    });
});
biomerseRoutes.route('/process').get(function(req, res){

});

app.use('/biomerse', biomerseRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});