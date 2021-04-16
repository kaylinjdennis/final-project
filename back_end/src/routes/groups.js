const express = require('express');
const router = express.Router();

const { createGroup, addMemberToGroup, getUsersGroups } = require('./helperFunctions');

module.exports = (db) => {

	router.post('/', (req, res) => {
		const userID = req.session.user_id;
		const groupName = req.body.name;
		const members = req.body.members;
		members.push(userID);

		createGroup(groupName, db)
			.then(res => {
				const group = res;
				for (const member of members) {
					addMemberToGroup(member, group.id, db)
				}
				return group;
			})
			.then(group => {
				res.send(group);
			})
			.catch(err => {
				res.status(500).json({ error: err.message })
			})
	})

	router.get('/', (req, res) => {
		const userID = req.session.user_id;

		getUsersGroups(userID, db)
			.then(data => res.send(data))
			.catch(err => {
				res.status(500).json({ error: err.message })
			})
	})



	return router;
}