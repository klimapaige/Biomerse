const express = require('express');
const biomerseRoutes = express.Router();

biomerseRoutes.route('/xeogl').get(function(req, res){
    res.status(200);
    var dir = __dirname.substring(0,__dirname.length-7);
    res.sendFile('/scripts/xeogl/xeogl.js', { root: dir });
});

biomerseRoutes.route('/interaction/:id').get(function(req, res){
    var id = req.params.id;
    res.status(200);
    var dir = __dirname.substring(0,__dirname.length-7);
    res.sendFile(`/scripts/interaction/interaction${id}.js`, { root: dir });
});

biomerseRoutes.route('/process/:id').get(function(req, res){
    var id = req.params.id;
    res.status(200);
    var dir = __dirname.substring(0,__dirname.length-7);
    res.sendFile(`/scripts/process/process${id}.js`, { root: dir });
});

module.exports = biomerseRoutes;