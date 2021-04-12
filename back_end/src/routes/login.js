const express = require('express');
const router = express.Router();
const { login } = require('./helperFunctions');

module.exports = (db) => {
	// // Redirect to login page
	// router.get('/', (req, res) => {
	// 	res.redirect('/');
	// });

	// Login as specified user (by given id) and redirect to main page
	router.get('/:id', (req, res) => {
		req.session.user_id = req.params.id;
		res.redirect('/api/user');
	});

	// Login user using information provided in form
	router.post('/', (req, res) => {
		const { email, password } = req.body;
		login(email, password, db)
			.then(user => {
				if (!user) {
					res.status(401);
					return res.send('test');
				}
				req.session.user_id = user.id;
				res.send({ name: user.name, email: user.email, id: user.id });
			})
			.catch(e => res.send(e));
	});

	return router;
}