INSERT INTO users (name, email, password, avatar)
VALUES 
	('John Smith', 'john@gmail.com', 'password', 'https://i.imgur.com/okB9WKC.jpg'),
	('David Johnson', 'david@gmail.com', 'password', 'https://i.imgur.com/iHq8K8Z.jpg'),
	('Michael Swanson', 'michael@gmail.com', 'password', 'https://i.imgur.com/3tVgsra.jpg'),
	('Samuel Jones', 'samuel@gmail.com', 'password', 'https://i.imgur.com/Nmx0Qxo.png'),
	('Grace Peterson', 'grace@gmail.com', 'password', 'https://i.imgur.com/T2WwVfS.png'),
	('Cecilia Thatcher', 'cecilia@gmail.com', 'password', 'https://i.imgur.com/LpaY82x.png'),
	('Paula Hyland', 'paula@gmail.com', 'password', 'https://i.imgur.com/TdOAdde.jpg'),
	('Will Bernard', 'will@gmail.com', 'password', 'https://i.imgur.com/FK8V841.jpg'),
	('James Forrest', 'james@gmail.com', 'password', 'https://i.imgur.com/twYrpay.jpg'),
	('Oliver Bristow', 'oliver@gmail.com', 'password', 'https://i.imgur.com/nPywAp1.jpg');

INSERT INTO groups (name) 
VALUES
	('Work'),
	('Best Friends'),
	('Roommates'),
	('Road Trip');

INSERT INTO user_groups (user_id, group_id)
VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(1, 2),
	(8, 2),
	(7, 2),
	(1, 3),
	(2, 3),
	(8, 3),
	(1, 4),
	(3, 4),
	(5, 4);

INSERT INTO invoices (description, cost, created_at, poster_id, group_id)
VALUES
	('Pizza', 7, '2021-04-09', 1, 1),
	('Movie Tickets', 10, '2021-04-09', 1, 2),
	('Dinner Friday Night', 25, '2021-04-09', 7, 2),
	('Cleaning Supplies', 14.33, '2021-04-09', 1, 3),
	('Rent', 600, '2021-04-09', 8, 3),
	('Hotels', 547, '2021-04-09', 1, 4),
	('Gas', 30, '2021-04-09', 3, 4),
	('Food', 45, '2021-04-09', 5, 4);

INSERT INTO bills (payee_id, invoice_id, paid)
VALUES
	(2, 1, true),
	(3, 1, false),
	(4, 1, false),
	(5, 1, false),
	(8, 2, false),
	(7, 2, true),
	(1, 3, false),
	(8, 3, true),
	(2, 4, false),
	(8, 4, true),
	(1, 5, false),
	(2, 5, true),
	(3, 6, true),
	(5, 6, false),
	(1, 7, false),
	(5, 7, true),
	(1, 8, false),
	(5, 8, true);

INSERT INTO friends (user_first_id, user_second_id, confirmed)
VALUES
	(1, 2, true),
	(1, 3, true),
	(1, 4, true),
	(1, 5, true),
	(1, 7, true),
	(1, 8, true),
	(6, 1, false),
	(9, 1, false),
	(10, 1, false);