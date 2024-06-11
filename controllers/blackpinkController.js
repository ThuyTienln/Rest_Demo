const Blackpink = require('../models/blackpink');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

class blackpinkController {
    getAll(req, res){
        Blackpink.find({})
            .then((blackpink) => {
                res.statusCode = 200;
                res.json(blackpink);
            })
    }
    addBlackpink(req, res) {
        Blackpink.create(req.body)
        .then((blackpink) => {
            res.json(blackpink);
        })
    }
    deleteBlackpink(req, res) {
        Blackpink.deleteOne({})
        .then(() => {
            res.status(200).json({message: 'Delete oldest document.'})
        })
    }
    updateBlackpink(req, res) {
        res.status(403).json({message: 'Not supported.'})
    }

    detailBlackpink(req, res) {
        Blackpink.findById(req.params.blackpinkId)
        .then((bl) => {
            res.json(bl);
        })
    }
    deleteMember(req, res) {
        Blackpink.findByIdAndDelete(req.params.blackpinkId)
        .then((resp) => {
            res.status(200).json({message: 'Delete successfully.'});
        })
    }
    updateBlackpinkMember(req, res) {
        Blackpink.findByIdAndUpdate(req.params.blackpinkId, {
            $set: req.body
        }, {new: true})
        .then((bl) => {
            res.json(bl);
        })
    }

    //exercise 14
    getAllComment(req, res,) {
        Blackpink.findById(req.params.blackpinkId)
        .then((bl) => {
            if (bl != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bl.comments);
            }
            else {
                res.status(404).json({message: 'Member ' + req.params.blackpinkId + ' not found!!'});
            }
        })
    }
    addComment(req, res) {
        Blackpink.findById(req.params.blackpinkId)
       .then((bl) => { 
        if (bl != null) {
            bl.comments.push(req.body);
            bl.save()
           .then((bl) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bl);
            })
        }
        else {
            res.status(404).json({message: 'Member ' + req.params.blackpinkId + ' not found!!'});
        }
       })
    }
    deleteComment(req, res) { 
        Blackpink.findById(req.params.blackpinkId)
       .then((bl) => {
        if (bl != null) {
            for (var i = (bl.comments.length - 1); i >= 0; i--) {
                bl.comments.id(bl.comments[i]._id).deleteOne();
            }
            bl.save()
            .then((bl) => {
                res.status(200).json({message: 'Deleted all comment of ' +  req.params.blackpinkId});
            })
        }
        else {
            res.status(404).json({message: 'Member'+ req.params.blackpinkId +'not found!!'});
        }
       })
    }
    updateComment(req, res) {
        res.status(403).json({message: 'Not supported.'})
    }
    
    detailBlackpinkComment(req, res) {
        Blackpink.findById(req.params.blackpinkId)
       .then((bl) => {
        if ( bl != null && bl.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bl.comments.id(req.params.commentId));
        }
        else if (bl != null) {
            res.status(404).json({message: 'Member'+ req.params.blackpinkId +'not found!!'});
        }
        else {
            res.status(404).json({message: 'Comment'+ req.params.commentId +'not found!!'});
        }
       })
    }
    deleteCommentFollowId(req, res) {
        Blackpink.findById(req.params.blackpinkId)
       .then((bl) => {
        if (bl!= null && bl.comments.id(req.params.commentId)!= null) {
            bl.comments.id(req.params.commentId).deleteOne();
            bl.save()
           .then((bl) => {
                res.status(200).json({message: 'Deleted comment '+ req.params.commentId +' of '+ req.params.blackpinkId + ' succesfully'});
            })
        }
        else if (bl!= null) {
            res.status(404).json({message: 'Member'+ req.params.blackpinkId +'not found!!'});
        }
        else {
            res.status(404).json({message: 'Comment'+ req.params.commentId +'not found!!'});
        }
       })
    }
    updateCommentFollowId(req, res) {
        Blackpink.findById(req.params.blackpinkId)
       .then((bl) => {
        if (bl!= null && bl.comments.id(req.params.commentId)!= null) {
            bl.comments.id(req.params.commentId).set(req.body);
            bl.save()
           .then((bl) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bl);
            })
        }
        else if (bl!= null) {
            res.status(404).json({message: 'Member'+ req.params.blackpinkId +'not found!!'});
        }
        else {
            res.status(404).json({message: 'Comment'+ req.params.commentId +'not found!!'});
        }
       })
    }

    //exercise 13.1
    getBlackpink(req,res) {
        Blackpink.find({})
        .then((blackpinks) => {
            res.render('index', {
                title : 'List of Blackpink',
                blackpinkData : blackpinks
        })
        })
    }
    create(req, res) {
        const bl = new Blackpink(req.body);
        bl.save()
        .then(() => res.redirect('/blackpink'))
    }
    deleteMember(req, res) {
        Blackpink.findByIdAndDelete(req.params.blackpinkId)
       .then(() => res.redirect('/blackpink'))
    }
    //exercise 14.1
    formEdit(req, res) {
        let viewsData = {};
        Blackpink.findById(req.params.blackpinkId)
        .then((blackpinks) => {
            res.render('editMember', {
                title : 'Edit Page',
                blackpinkData : blackpinks
        })
        })
    }
    edit(req, res) {
        Blackpink.updateOne({_id : req.params.blackpinkId}, req.body)
        .then(() => {
            res.redirect('/blackpink')
        })
    }
}
module.exports = new blackpinkController;