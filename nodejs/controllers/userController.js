const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


var { User } = require('../models/user');
var config = require('../db');


router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save((err, docs) => {
                if(!err) {
                    res.send(docs);
                } else {
                    console.log('Error in Customer Save : ' + JSON.stringify(err, undefined, 2));
                }
            });
        });
    });
});


router.post('/authenticate', (req, res, next) => {
    // get username and password
    const username = req.body.username;
    const password = req.body.password;

    const query = {username: username}
    User.findOne(query, (err, user) => {
        if(err) {
            throw err;
        }

        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        // If user exists, we are gonna match the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 604800 // week
                    });
    
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
    
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
        });
    });
});


router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});

module.exports = router;