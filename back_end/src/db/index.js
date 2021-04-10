const pg = require("pg");

const client = new pg.Client({
	connectionString: process.env.DATABASE_URL || ""
});

client
	.connect()
	.catch(error => console.log(`Error connecting to Postgres server:\n${error}`));

module.exports = client;