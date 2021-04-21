const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyparser = require('body-parser');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const db = require('./db');

// Require individual routes here
// Ex. const days = require('./routes/days');
const user = require('./routes/user');
const login = require('./routes/login');
const logout = require('./routes/logout');
const bills = require('./routes/bills');
const groups = require('./routes/groups');

function read(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(
			file,
			{ encoding: 'utf-8' },
			(error, data) => {
				if (error) return reject(error);
				resolve(data);
			}
		);
	});
}

module.exports = function application(
	ENV,
	actions = { updateUsers: () => { } }
) {
	app.use(helmet());
	app.use(bodyparser.json());
	app.use(morgan('dev'));

	app.set("view engine", "ejs");
	app.use(express.static("public"));

	app.use(cookieSession({
		name: 'session',
		keys: ['key1', 'key2'],
		maxAge: 24 * 60 * 60 * 1000
	}));

	// Include routes here
	app.use('/api/user', user(db));
	app.use('/api/login', login(db));
	app.use('/api/logout', logout());
	app.use('/api/bills', bills(db));
	app.use('/api/groups', groups(db));

	if (ENV === 'development' || ENV === 'test') {
		Promise.all([
			read(path.resolve(__dirname, `db/schema/create.sql`)),
			read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
		])
			.then(([create, seed]) => {
				app.get('/api/debug/reset', (req, res) => {
					db.query(create)
						.then(() => db.query(seed))
						.then(() => {
							console.log('Database Reset');
							res.status(200).send('Database Reset');
						});
				});
			})
			.catch(error => {
				console.log(`Error setting up the reset route: ${error}`);
			});
	}

	app.close = () => {
		return db.end();
	};

	return app;
}