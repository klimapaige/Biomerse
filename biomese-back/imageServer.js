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
biomerseRoutes.route('/interaction/:id').get(cors(corsOptions),function(req, res){
    var id = req.params.id;
    res.status(200);
    res.sendFile(`${__dirname}/images/interaction/${id}.png`);
});
biomerseRoutes.route('/process/:id').get(cors(corsOptions),function(req, res){
    var id = req.params.id;
    res.status(200);
    res.sendFile(`${__dirname}/images/process/${id}.png`);
});

//texture images
biomerseRoutes.route('/texture/:name').get(cors(corsOptions),function(req, res){
    var name = req.params.name;
    res.status(200);
    res.sendFile(`${__dirname}/images/textureImages/${name}`);
});

app.use('/bioImages', biomerseRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});