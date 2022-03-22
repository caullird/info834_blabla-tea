const User = require('../../app/database/schemas/user');
const assert = require('assert');

let user;
beforeEach(() => {
    user = new User({  username: 'MPH' });
    user.save()
        .then(() => done());
});

describe('Reading user details', () => {
    it('Finds user with the name of MPH', (done) => {
        User.findOne({ username: 'MPH' })
            .then((pokemon) => {
                assert(user.username === 'MPH'); 
                done();
            });
    })
})