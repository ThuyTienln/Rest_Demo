const User = require('../models/Users');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var passport = require('passport');
const mongoose = require('mongoose');

class userController {
    register(req, res) {
        res.render('register', {
            title: 'Sign up'
        })
    }
    signup(req, res, next) {
        const { username, password } = req.body;
        let errors = [];
        if (!username || !password) {
            errors.push({ msg: 'Please enter all fields' });
        }
        if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
            res.render('register', {
                errors,
                username,
                password
            });
        }
        else {
            User.findOne({ username: username }).then(user => {
                if (user) {
                    errors.push({ msg: 'Username already exists' });
                    res.render('register', {
                        errors,
                        username,
                        password
                    });
                }
                else {
                    const newUser = new User({
                        username,
                        password
                    });
                    //Hash password
                    bcrypt.hash(newUser.password, 10, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.redirect('/users/login');
                            })
                            .catch(next);
                    });
                }
            });
        }
    }

    login(req, res, next) {
        res.render('login')
    }

    //exercise 18.1
    signin(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/users/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    }
    dashboard(req, res, next) {
        // res.render('dashboard')
        User.find({})
        .then((user) => {
            res.render('dashboard', {
                title : 'List of User',
                userData : user
        })
        })
    }
    signout(req, res) {
        req.logout(function(err) {
            if (err) {return next(err);}
            req.flash('success_msg', 'You are logged out');
            res.redirect('/users/login');
        });
    }

    // deleteUser(req, res) {
    //     User.findByIdAndDelete(req.params.userId)
    //    .then(() => res.redirect('/users/dashboard'))
    // }

}

module.exports = new userController;