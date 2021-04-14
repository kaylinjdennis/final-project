const express = require('express');
const router = express.Router();

module.exports = (db) => {

	// Get current users information
	router.get("/", (req, res) => {
		const userID = req.session.user_id;
		if (userID) {
			db.query(`SELECT * FROM users WHERE id = $1;`, [userID])
				.then(data => {
					const users = data.rows[0];
					res.send({ id: users.id, name: users.name, email: users.email });
				})
				.catch(err => {
					res
						.status(500)
						.json({ error: err.message });
				});
		} else {
			res.send({});
		}
	})

	// Get all friends of current user and friend requests
	router.get('/friends', (req, res) => {
		const userID = req.session.user_id;
		if (userID) {
			db.query(`SELECT id, name, email FROM users`)
				.then(data => {
					const users = data.rows;
					db.query(
						`
						SELECT * FROM friends 
						WHERE user_first_id = $1 OR user_second_id = $1;
						`,
						[userID])
						.then(data => {
							const friends = data.rows;
							const result = { current_friends: [], requests_recieved: [], requests_sent: [] }
							for (const friend of friends) {
								if (friend.confirmed) {
									const friend_user_id = (friend.user_first_id === userID ? friend.user_second_id : friend.user_first_id)
									result.current_friends.push({ id: friend.id, friend_info: users[friend_user_id] });
								} else if (friend.user_first_id.toString() === userID) {
									for (const user of users) {
										if (user.id === friend.user_second_id) {
											result.requests_sent.push({ id: friend.id, friend_info: user });
										}
									}
								} else if (friend.user_second_id.toString() === userID) {
									for (const user of users) {
										if (user.id === friend.user_first_id) {
											result.requests_recieved.push({ id: friend.id, friend_info: user });
										}
									}
								}
							}
							res.send(result);
						})
				})
				.catch(err => {
					res
						.status(500)
						.json({ error: err.message });
				});
		} else {
			res.send({});
		}
	})

	// router.post('/friends', (req, res) => 

	// )}

	// Get info for current users profile page (including groups, bills, friends etc)
	// ----------------------------------------------------
	// ADD LOGIC INTO THIS FUNCTION!!!!!
	// ----------------------------------------------------
	router.get('/:id', (req, res) => {
		const userID = req.params.id;
		if (req.session.user_id === userID) {
			db.query(`SELECT * FROM users WHERE id = $1;`, [userID])
				.then(data => {
					const users = data.rows[0];
					res.send({ id: users.id, name: users.name, email: users.email });
				})
				.catch(err => {
					res
						.status(500)
						.json({ error: err.message });
				});
		} else {
			res.send({});
		}
	})

	return router;
};