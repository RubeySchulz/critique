const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/critique', {
    
});

module.exports = mongoose.connection;