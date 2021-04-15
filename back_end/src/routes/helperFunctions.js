const bcrypt = require('bcrypt');
const user = require('./user');

const login = (email, password, db) => {
	const query = `SELECT * FROM users WHERE email = $1`;
	const value = [email || 'null'];
	return db.query(query, value)
		.then(res => res.rows[0])
		.then(res => {
			if (res !== undefined && bcrypt.compareSync(password, res.password)) {
				return res;
			}
			return null;
		})
		.catch((err, res) => res.send(err))
}

const createInvoice = (description, cost, date, userID, group_id, db) => {
	const query =
		`
		INSERT INTO invoices (description, cost, created_at, poster_id, group_id)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;
		`;
	const values = [description, cost, date, userID, group_id]

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
}

const getGroupMembers = (group_id, db) => {
	const query =
		`
		SELECT * FROM user_groups
		WHERE group_id = $1;
		`;
	const values = [group_id]
	return db.query(query, values)
		.then(res => res.rows)
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
};

const createBill = (payee_id, invoice_id, db) => {
	const query =
		`
		INSERT INTO bills (payee_id, invoice_id)
		VALUES ($1, $2)
		RETURNING *;
		`;
	const values = [payee_id, invoice_id]

	db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
}

const createGroup = (groupName, db) => {
	const query =
		`
		INSERT INTO groups (name)
		VALUES ($1)
		RETURNING *;
		`;
	const values = [groupName];

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
}

const addMemberToGroup = (user_id, group_id, db) => {
	const query =
		`
		INSERT INTO user_groups (user_id, group_id)
		VALUES ($1, $2)
		RETURNING *;
		`;
	const values = [user_id, group_id];

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
}

const deleteBill = (billID, db) => {
	const query = `DELETE FROM bills WHERE id = $1`;
	const values = [billID]

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => {
			console.error('QUERY ERROR:\n', err.stack);
		});
}

const editBill = (billID, updatedValues, db) => {
	let query = `UPDATE bills `;
	const values = [];

	if (updatedValues.paid) {
		values.push(updatedValues.paid);
		query += `SET paid = $1`;
	}

	values.push(billID);
	query += ` WHERE id = $2 RETURNING *;`;

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => console.error('QUERY ERROR:\n', err.stack));
}

const editInvoice = (invoice_id, updatedValues, db) => {
	let query = `UPDATE invoices `;
	const values = [];
	const propertiesToUpdate = ['description', 'cost'];

	for (let property of propertiesToUpdate) {
		if (updatedValues[property]) {
			values.push(updatedValues[property]);
			if (values.length > 1) {
				query += `, ${property} = $${values.length}`;
			} else {
				query += `SET ${property} = $${values.length}`;
			}
		}
	}

	values.push(invoice_id);
	query += ` WHERE id = $${values.length}  RETURNING *;`;

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => console.error('QUERY ERROR:\n', err.stack));
}

const findUserByEmail = (email, db) => {
	const query = `SELECT id FROM users WHERE email = $1`;
	const values = [email];

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => console.error('QUERY ERROR:\n', err.stack));
}

const sendFriendRequest = (userID, friendID, db) => {
	const query =
		`
	INSERT INTO friends (user_first_id, user_second_id)
	VALUES ($1, $2)
	RETURNING *;
	`;
	const values = [userID, friendID];

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => console.error('QUERY ERROR:\n', err.stack));
}

const acceptFriendRequest = (userID, friendID, db) => {
	const query =
		`
		UPDATE friends
		SET confirmed = true
		WHERE user_first_id = $1 AND user_second_id = $2
		RETURNING *;
		`;
	const values = [friendID, userID];

	return db.query(query, values)
		.then(res => res.rows[0])
		.catch(err => console.error('QUERY ERROR:\n', err.stack));
}



module.exports = {
	login,
	createBill,
	getGroupMembers,
	createInvoice,
	createGroup,
	addMemberToGroup,
	deleteBill,
	editBill,
	editInvoice,
	findUserByEmail,
	sendFriendRequest,
	acceptFriendRequest
}