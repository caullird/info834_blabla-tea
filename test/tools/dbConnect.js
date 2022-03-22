const mongoose = require('mongoose');
var config = require('../../config');

mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(MONGODB_URI);

mongoose.connection
	.once('open', () => console.log('Connected!'))
	.on('error', (error) => {
		console.warn('Error : ', error);
	});
	
	// runs before each test
	beforeEach((done) => {
		mongoose.connection.collections.users.drop(() => {
		done();
	});
});
