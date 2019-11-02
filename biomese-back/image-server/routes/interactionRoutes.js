const express = require('express');
const biomerseRoutes = express.Router();

biomerseRoutes.route('/:id').get(function(req, res){
    var id = req.params.id;
    res.status(200);
    var dir = __dirname.substring(0,__dirname.length-7);
    res.sendFile(`/images/interaction/${id}.png`, { root: dir });
});

module.exports = biomerseRoutes;