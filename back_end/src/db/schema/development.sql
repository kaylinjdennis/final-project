INSERT INTO users (name, email, password)
VALUES 
	('Jim Halpert', 'jim@gmail.com', 'scranton'),
	('Dwight Schrute', 'dwight@gmail.com', 'beets'),
	('Michael Scott', 'michael@gmail.com', 'office');

INSERT INTO groups (name) 
VALUES
	('Office'),
	('Best Friends');

INSERT INTO user_groups (user_id, group_id)
VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(2, 2),
	(3, 2);

INSERT INTO invoices (description, cost, created_at, poster_id, group_id)
VALUES
	('Dinner Friday Night', 25, '2021-04-09', 1, 1),
	('Snacks', 5, '2021-02-21', 3, 2),
	('description', 37, '2021-03-10', 2, 1);

INSERT INTO bills (payee_id, invoice_id)
VALUES
	(2, 1),
	(3, 1),
	(2, 2),
	(1, 3),
	(3, 3);

INSERT INTO friends (user_first_id, user_second_id)
VALUES
	(1, 2),
	(1, 3),
	(3, 2);