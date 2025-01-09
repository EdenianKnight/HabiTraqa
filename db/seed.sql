INSERT INTO users (username, email, password)
VALUES ('testuser', 'test@example.com', 'password-hash');

INSERT INTO habits (user_id, name, is_completed)
VALUES (1, 'Daily Walk', false);
