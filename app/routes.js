var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('./models/user');
var Message = require('./models/message');

// Home page
router.get('/', function(req, res, next) {
	// If user is already logged in, redirect to dashboard
	if(req.isAuthenticated()){
		res.redirect('/dashboard');
	}
	// If not, render login page
	else{
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0]
		});
	}
});

// Login
router.post('/login', passport.authenticate('local', { 
	successRedirect: '/dashboard', 
	failureRedirect: '/',
	failureFlash: true
}));

// Register via username and password
router.post('/register', function(req, res, next) {

	var credentials = {'username': req.body.username, 'password': req.body.password };

	if(credentials.username === '' || credentials.password === ''){
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	}else{

		// Check if the username already exists
		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i')}, function(err, user){
			if(err) throw err;
			if(user){
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});

// Dashboard
router.get('/dashboard', [User.isAuthenticated, function(req, res, next) {
	User.find(function(err, users){
		if(err) throw err;
		users = users.filter(user => user.username !== req.user.username);
		User.findConversations(function(err, conversations){
			if(err) throw err;
			res.render('dashboard', { user: req.user, users: users, conversations: conversations });
		});
	});
}]);

// get chat messages
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
	var userId = req.params.id;
	Message.findMessagesWith(req.user.id, userId, function(err, messages){
		if(err) throw err;
		res.send(messages);
	});
}]);

// Logout
router.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();

	// destroy session data
	req.session = null;

	// redirect to homepage
	res.redirect('/');
});

module.exports = router;