var express = require('express');
var blackpinkRouter = express.Router();
const blackpinkController = require('../controllers/blackpinkController');

blackpinkRouter.route('/')
.get(blackpinkController.getBlackpink)
.post(blackpinkController.create)

blackpinkRouter.route('/delete/:blackpinkId')
.get(blackpinkController.deleteMember)

blackpinkRouter.route('/edit/:blackpinkId')
.get(blackpinkController.formEdit)
.post(blackpinkController.edit)

module.exports = blackpinkRouter;