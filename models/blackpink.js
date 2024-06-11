const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchemar = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})

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
    comments: [commentSchemar]
}, {timestamps: true});

var Blackpink = mongoose.model('blackpink', blackpinkSchema);
module.exports = Blackpink;
