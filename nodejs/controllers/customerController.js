const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var { Customer } = require('../models/customer');


// GET - localhost:3000/customers/
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Customer.find((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            console.log('Error in retrieving Customers : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// GET - localhost:3000/customers/id
router.get('/:id', (req, res) => {
    // check if ID is valid
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    // If ID is valid
    Customer.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in receiving Customer :' + JSON.stringify(err, undefined, 2));
        }
    });
});


// POST - localhost:3000/customers/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    // Insert new customer
    var customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        note: req.body.note
    });

    customer.save((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            console.log('Error in Customer Save : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// UPDATE - localhost:3000/customers/id
router.put('/:id', (req, res) => {
    // check if ID is valid
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    // if ID is valid
    var customer = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        note: req.body.note
    };

    // Update customer with new information 
    Customer.findByIdAndUpdate(req.params.id, { $set: customer }, { new: true }, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Customer Update: ' + JSON.stringify(err, undefined, 2));
        }
    });
})


// DELETE - localhost:3000/customers/id
router.delete('/:id', (req, res) => {
    // check if ID is valid
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    // if ID is valid
    Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Customer Delete :' + JSON.stringify(err, undefined, 2));
        }
    });

});

module.exports = router;