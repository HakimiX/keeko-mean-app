const mongoose = require('mongoose');

var Customer = mongoose.model('Customer', {
    name: {type: String},
    email: {type: String},
    phone: {type: Number},
    note: {type: String}
});

module.exports = {Customer};
