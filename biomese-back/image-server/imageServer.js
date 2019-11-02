const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4200;
const biomerseRoutes = express.Router();
const cors = require('cors');
var corsOptions = {
    origin: false,
}
//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

//connection route
biomerseRoutes.route('/').get(function (req, res) {
    res.status(200).json({ 'Connection': 'connected to server successfully' })
});

//preview image routes
var interacion = require('./routes/interactionRoutes');
biomerseRoutes.use('/interaction',interacion);

var process = require('./routes/processRoutes');
biomerseRoutes.use('/process',process);

//texture images
var texture = require('./routes/textureRoutes');
biomerseRoutes.use('/texture',texture);

app.use('/bioImages', biomerseRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});