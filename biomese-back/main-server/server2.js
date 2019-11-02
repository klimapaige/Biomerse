const express = require('express');
const bodyParser = require('body-parser');
const biomerseRoutes = express.Router();
const app = express();
const PORT = 4000;
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

//interacion routes
var interacion = require('./routes/interactionRoutes');
biomerseRoutes.use('/interaction',interacion);

//process routes
var interacion = require('./routes/processRoutes');
biomerseRoutes.use('/process',interacion);

//script routes
var interacion = require('./routes/scriptRoutes');
biomerseRoutes.use('/script',interacion);

app.use('/biomerse', biomerseRoutes);
app.listen(PORT, () => {
    console.log('listening on 4000')
})

