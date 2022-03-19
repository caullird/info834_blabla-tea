var Mongoose = require('mongoose');

/**
 * Every user has a username and password
 * Hash user's password
 *
 */
var MessageSchema = new Mongoose.Schema({
    from: {  type : Mongoose.Schema.Types.ObjectId, ref : "user", required: true },
    to: {  type : Mongoose.Schema.Types.ObjectId, ref : "user", required: true },
    date : { type : Date, default: Date.now },
    message: { type: String, required: true }
});

var messageModel = Mongoose.model('message', MessageSchema);

module.exports = messageModel;