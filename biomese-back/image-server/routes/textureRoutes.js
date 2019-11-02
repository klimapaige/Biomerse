const express = require('express');
const biomerseRoutes = express.Router();

biomerseRoutes.route('/:name').get(function(req, res){
    var name = req.params.name;
    res.status(200);
    var dir = __dirname.substring(0,__dirname.length-7);
    res.sendFile(`/images/textureImages/${name}`, { root: dir });
});

module.exports = biomerseRoutes;