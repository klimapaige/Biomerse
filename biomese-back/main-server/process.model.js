const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Process = new Schema({
    process_id:{
        type: Number
    },
    process_name:{
        type: String
    },
    image_url:{
        type: String
    }
});

module.exports = mongoose.model('Process', Process);