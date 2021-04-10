const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

const db = require('./db');

// Require individual routes here
// Ex. const days = require('./routes/days');
const user = require('./routes/user');

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
	actions = { updateDatabase: () => { } }
) {
	app.use(cors());
	app.use(helmet());
	app.use(bodyparser.json());

	// Include routes here
	// Ex. app.use('api', days(db));
	app.use('api', user(db))

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