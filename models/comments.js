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
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})
var Comment = mongoose.model('Comment', commentSchemar);
module.exports = Comment;