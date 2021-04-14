const express = require('express');
const router = express.Router();

const { createBill, getGroupMembers, createInvoice } = require('./helperFunctions');

module.exports = (db) => {

	// Get bills for current user, either posted or recieved
	router.get('/:type/:user_id', (req, res) => {
		const type = req.params.type;
		const userID = req.params.user_id;
		if (type === 'posted') {
			const query =
				`
				SELECT invoices.cost, invoices.created_at, invoices.description, invoices.group_id, bills.payee_id, bills.paid
				FROM bills
				JOIN invoices ON invoice_id = invoices.id
				WHERE invoices.poster_id = $1;
			`;
			const values = [userID];
			db.query(query, values)
				.then(data => {
					const bills = data.rows
					res.send(bills);
				})
				.catch(err => {
					res.status(500).json({ error: err.message })
				})
		} else if (type === 'recieved') {
			const query =
				`
					SELECT invoices.cost, invoices.created_at, invoices.description, invoices.poster_id, invoices.group_id, bills.paid
					FROM bills
					JOIN invoices ON invoice_id = invoices.id
					WHERE payee_id = $1;
				`;
			const values = [userID];
			db.query(query, values)
				.then(data => {
					const bills = data.rows
					res.send(bills);
				})
				.catch(err => {
					res.status(500).json({ error: err.message })
				})
		}
	})

	// Create new bill
	router.post('/', (req, res) => {
		const userID = req.session.user_id;
		const description = req.body.description;
		const cost = req.body.cost;
		const date = new Date()
		const group_id = req.body.group_id

		createInvoice(description, cost, date, userID, group_id, db)
			.then(res => {
				const invoice_id = res.id
				getGroupMembers(group_id, db)
					.then(res => {
						const members = res;
						const memberIDs = [];
						for (const member of members) {
							memberIDs.push(member.user_id)
						}
						return memberIDs;
					})
					.then((res) => {
						const memberIDs = res;
						for (const id of memberIDs) {
							if (id !== Number(userID)) {
								createBill(id, invoice_id, db);
							}
						}
					})
			})
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).json({ error: err.message })
			})
	})

	// Get specified bill by id
	router.get('/:id', (req, res) => {
		const billID = req.params.id;
		const query =
			`
			SELECT *
			FROM bills
			JOIN invoices ON invoice_id = invoices.id
			WHERE bills.id = $1
			`;
		const values = [billID];

		db.query(query, values)
			.then(res => (res.rows[0]))
			.then(bill => {
				if (bill) {
					res.send({ ...bill, id: Number(billID) });
				} else {
					res.send({});
				}

			})
			.catch(err => {
				res.status(500).json({ error: err.message })
			})
	})

	return router;
};