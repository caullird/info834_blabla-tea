//import the User model
const User = require('../../app/database/schemas/user');
const assert = require('assert');

describe('Creating documents in MongoDB', () => {
	it('Creates a New User', (done) => {
		const newUser = new User({ username: 'ALLOUI'});
		newUser.save() 
			.then(() => {
				assert(!newUser.isNew);
				done();
			});
	});
});
