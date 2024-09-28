const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blackpinkSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    age: {
        type : Number,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    nation : {
        type : String,
        required : true
    },
    // comments: [commentSchemar]
    comments : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }
}, {timestamps: true});

var Blackpink = mongoose.model('blackpink', blackpinkSchema);
module.exports = Blackpink;
