var express = require('express');
const userController = require('../controllers/userController');
var userRouter = express.Router();
const { ensureAuthenticated } = require('../config/auth');

userRouter.route('/')
.get(userController.register)
.post(userController.signup)

userRouter.route('/login')
.get(userController.login)

userRouter.route('/login')
.get(userController.login)
.post(userController.signin)

userRouter.route('/logout')
.get(userController.signout)

userRouter.route('/dashboard')
.get(ensureAuthenticated, userController.dashboard)

// userRouter.route('/delete/:userId')
// .get(ensureAuthenticated, userController.deleteUser)

module.exports = userRouter;