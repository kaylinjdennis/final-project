const express = require('express');
const router = express.Router();

// Logout user by clearing cookies and redirecting to login page
module.exports = () => {
	router.get('/', (req, res) => {
		res.clearCookie('session');
		res.clearCookie('session.sig');
		res.redirect('/api/user');
	});
	return router;
};