const User = require('../../app/database/schemas/user');
const Message = require('../../app/database/schemas/message');
const assert = require('assert');

let message;
beforeEach(() => {

    let newUser1 = new User({ username: 'USER1'});
    newUser1.save() 

    let newUser2 = new User({ username: 'USER2'});
    newUser2.save() 
     
    message = new Message({ 
        from : newUser1,
        to : newUser2,
        message : "message de test"
    });

    message.save().then(() => done());
});


describe('Reading message details', () => {
    it('Finds message with USER1 & USER2', (done) => {
        Message.findOne({ message: 'message de test' })
            .then((messages) => {
                assert(messages.message === 'message de test'); 
                done();
            });
    })
})