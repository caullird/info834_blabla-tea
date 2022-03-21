const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/chat';
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
