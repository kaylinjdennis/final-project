INSERT INTO users (name, email, password, avatar)
VALUES 
	('Jim Halpert', 'jim@gmail.com', 'scranton', 'https://i.imgur.com/LpaY82x.png'),
	('Dwight Schrute', 'dwight@gmail.com', 'beets', 'https://i.imgur.com/iHq8K8Z.jpg'),
	('Michael Scott', 'michael@gmail.com', 'office', 'https://i.imgur.com/3tVgsra.jpg'),
	('Pam', 'pam@gmail.com', 'jim', 'https://i.imgur.com/okB9WKC.jpg');

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
	(3, 2),
	(1, 4),
	(2, 4);