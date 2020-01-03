const express = require('express');
const biomerseRoutes = express.Router();
const fs = require('fs');

biomerseRoutes.route('/interaction/:id').get(function (req, res) {
    var id = req.params.id;
    res.status(200);
    if(id>4){
        var dir = __dirname.substring(0, __dirname.length - 7);
        var add = `\nconst link = 'http://localhost:4000/biomerse/interaction/${id}';
        fetch(link, {
            method: 'GET',
            mode: 'cors',
            headers: {
                ...{ 'Content-Type': 'application/json' },
            },
        }).then(response => response.json()).then((responseJSON) => {
            main(responseJSON);
        });`
    
        var fileName = `${dir}/scripts/interaction/interaction.js`;
        var data = fs.readFileSync(fileName).toString();
        let splitArray = data.split('\n');
        splitArray.splice(splitArray.length-10, 10);
        let result = splitArray.join('\n');
        fs.writeFileSync(fileName, result+add);
        res.sendFile(`/scripts/interaction/interaction.js`, { root: dir });
    }else{
        res.sendFile(`/scripts/interaction/interaction${id}.js`, { root: dir });
    }
});

biomerseRoutes.route('/process/:id').get(function (req, res) {
    var id = req.params.id;
    res.status(200);
    var dir = __dirname.substring(0, __dirname.length - 7);
    res.sendFile(`/scripts/process/process${id}.js`, { root: dir });
});

biomerseRoutes.route('/node_modules/*').get(function (req, res) {
    console.log(req.originalUrl);
    var location = req.originalUrl;
    location = location.substring(17);
    console.log(location);
    res.status(200);
    var dir = __dirname.substring(0, __dirname.length - 7);
    
    res.sendFile(`/${location}`, { root: dir });
});

biomerseRoutes.route('/*').get(function (req, res) {
    console.log(req.originalUrl);
    var location = req.originalUrl;
    location = location.substring(17);
    console.log(location);
    res.status(200);
    var dir = __dirname.substring(0, __dirname.length - 7);
    res.sendFile(`/scripts/${location}`, { root: dir });
});

module.exports = biomerseRoutes;