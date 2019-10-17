const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const biomerseRoutes = express.Router();
const PORT = 4000;
let Biomerse = require('./user.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/biomerseDB', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
biomerseRoutes.route('/').get(function(req, res) {
    Biomerse.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

app.use('/biomerse', biomerseRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});