var userModel = require('../database').models.user;
var messageModel = require('../database').models.message;

var create = function (data, callback){
	var newUser = new userModel(data);
	newUser.save(callback);
};

var find = function (data, callback){
	userModel.find(data, callback);
}

var findOne = function (data, callback){
	userModel.findOne(data, callback);
}

var findById = function (id, callback){
	userModel.findById(id, callback);
}

/**
 * Find all conversaction of user.
 *
 */
var findConversations = function (data, callback){
	messageModel.find(data, callback)
}

/**
 * A middleware allows user to get access to pages ONLY if the user is already logged in.
 *
 */
var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}


module.exports = { 
	create, 
	find,
	findOne, 
	findById, 
	findConversations, 
	isAuthenticated
};