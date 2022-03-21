//import the User model
const User = require('../../app/database/schemas/user');
const assert = require('assert');

describe('Creating documents in MongoDB', () => {
	it('Creates a New User', (done) => {
		const newUser = new User({ username: 'MPH'});
		console.log(newUser.username);
		newUser.save() // returns a promise after some time
			.then(() => {
				//if the newUser is saved in db and it is not new
				assert(!newUser.isNew);
				done();
			});
	});
});

describe('Reading Details of User', () => {
	const newUsers = new User({ username: 'MPH'});
	
	it('Finds user with the name', (done) => {
		
		//console.log(User.findOne({ username: 'MPH' }))
		
		User.findOne({ username: 'MPH' })
			.then((newUser) => {
				//assert(newUsers.username === 'MPH');
				done();
			});
	})
})
