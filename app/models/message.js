var messageModel = require('../database').models.message;
var User = require('../models/user');

var create = function (data, callback){
	var newMessage = new messageModel(data);
	newMessage.save(callback);
};

var find = function (data, callback){
	messageModel.find(data, callback);
}

var findOne = function (data, callback){
	messageModel.findOne(data, callback);
}

var findById = function (id, callback){
	messageModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	messageModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

/**
 * Add a user along with the corresponding socket to the passed message
 *
 */
 var findMessagesWith = function(user1, user2, callback){
	messageModel.find({ $or: [{from: user1, to: user2}, {from: user2, to: user1}] }, callback);
}


module.exports = { 
	create, 
	find, 
	findOne, 
	findById,
	findMessagesWith
};