const Comment = require('../models/comments');

class commentController {
    getComments(req, res) {
        Comment.find({})
           .then((comments) => {
                res.json(comments);
            })
    }   
    insertOne(req, res) {
        Comment.create(req.body)
           .then((comment) => {
                res.json(comment);
            })
    }
}
module.exports = new commentController;