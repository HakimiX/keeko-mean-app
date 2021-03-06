const mongoose = require('mongoose');

mongoose.connect('<database-string>', (err) => {
    if (!err){
        console.log('MongoDB connection succeeded...');
    } else {
        console.log('Error in MongoDB connection: ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;

module.exports = {
    secret: 'yoursecret'
}