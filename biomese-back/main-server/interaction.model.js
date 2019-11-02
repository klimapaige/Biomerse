const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Interaction = new Schema({
    interaction_id:{
        type: Number
    },
    interaction_name:{
        type: String
    },
    image_url:{
        type: String
    }
});

module.exports = mongoose.model('Interaction', Interaction);