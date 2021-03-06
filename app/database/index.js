var config = require('../../config');
var Mongoose = require('mongoose');

// Connect to the database
// construct the database URI and encode username and password.
var dbURI = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
Mongoose.connect(dbURI, { useNewUrlParser: true });

// Throw an error if the connection fails
Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});

// mpromise (mongoose's default promise library) is deprecated, 
// Plug-in your own promise library instead.
// Use native promises
Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		user: require('./schemas/user.js'),
		message: require('./schemas/message.js')
	}
};