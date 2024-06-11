var express = require('express');
var blackpinkRouter = express.Router();
const blackpinkController = require('../controllers/blackpinkController');

blackpinkRouter.route('/')
.get(blackpinkController.getAll)
.post(blackpinkController.addBlackpink)
.delete(blackpinkController.deleteBlackpink)
.put(blackpinkController.updateBlackpink)

blackpinkRouter.route('/:blackpinkId')
.get(blackpinkController.detailBlackpink)
.delete(blackpinkController.deleteMember)
.put(blackpinkController.updateBlackpinkMember)

blackpinkRouter.route('/:blackpinkId/comments')
.get(blackpinkController.getAllComment)
.post(blackpinkController.addComment)
.delete(blackpinkController.deleteComment)
.put(blackpinkController.updateComment)

blackpinkRouter.route('/:blackpinkId/comments/:commentId')
.get(blackpinkController.detailBlackpinkComment)
.delete(blackpinkController.deleteCommentFollowId)
.put(blackpinkController.updateCommentFollowId)

module.exports = blackpinkRouter;