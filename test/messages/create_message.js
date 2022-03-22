//import the User model
const User = require('../../app/database/schemas/user');
const Message = require('../../app/database/schemas/message');
const assert = require('assert');

describe('Creating documents in MongoDB', () => {
    it('Creates a simulation of the conversation between 2 people', (done) => {

        let newUser1 = new User({ username: 'USER1'});
		newUser1.save() 

        let newUser2 = new User({ username: 'USER2'});
		newUser2.save() 
		 
		let message = new Message({ 
            from : newUser1,
            to : newUser2,
            message : "message de test"
        });

		message.save() 
			.then(() => {
				assert(!message.isNew);
				done();
			});
	});


});
