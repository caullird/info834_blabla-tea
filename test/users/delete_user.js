const User = require('../../app/database/schemas/user');
const assert = require('assert');

describe('Deleting a user', () => {

  let user;

  beforeEach(() => {
    user = new User({ username: 'MPH' });
    user.save()
      .then(() => done());
  });

  it('removes a user using its instance', (done) => {
    user.remove()
      .then(() => User.findOne({ username: 'MPH' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('removes multiple users', (done) => {
    User.remove({ username: 'MPH' })
      .then(() => User.findOne({ username: 'MPH' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('removes a user', (done) => {
    User.findOneAndRemove({ username: 'MPH' })
      .then(() => User.findOne({ username: 'MPH' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
})