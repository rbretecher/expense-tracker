CREATE EXTENSION pgcrypto;

CREATE TABLE users
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    admin BOOLEAN NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE projects
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE categories
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE expenses
(
    id INT GENERATED ALWAYS AS IDENTITY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    paid_by_user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR (255) NOT NULL,
    date date NOT NULL,
    price NUMERIC(10,2) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE user_has_project
(
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    weight NUMERIC(3, 2) NOT NULL,

    PRIMARY KEY(user_id, project_id)
);

INSERT INTO users (name, email, password, admin, icon_name, icon_color) VALUES ('Bob', 'bob@demo.com', '$2a$06$uLh3Grumtw461OEI5R4EAuqJ.649jnXEl./Z6v58bG9Rz4dkbpgae', true, 'face', 'blue-10');
INSERT INTO users (name, email, password, admin, icon_name, icon_color) VALUES ('Alice', 'alice@demo.com', '$2a$06$uLh3Grumtw461OEI5R4EAuqJ.649jnXEl./Z6v58bG9Rz4dkbpgae', true, 'sentiment_satisfied_alt', 'pink-10');

INSERT INTO categories (name, icon_name, icon_color) VALUES ('Groceries', 'local_grocery_store', 'blue-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Housing', 'hotel', 'red-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Car', 'local_taxi', 'green-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Food', 'local_pizza', 'brown-10');

INSERT INTO projects (name, icon_name, icon_color) VALUES ('Shared expenses', 'calendar_today', 'blue-10');

INSERT INTO user_has_project (user_id, project_id, weight) VALUES (1, 1, 0.4);
INSERT INTO user_has_project (user_id, project_id, weight) VALUES (2, 1, 0.6);

INSERT INTO expenses (project_id, category_id, paid_by_user_id, name, date, price) 
VALUES  (1, 1, 1, 'Groceries', NOW(), 15.99),
        (1, 3, 1, 'Loyer', '2020-01-10', 900),
        (1, 3, 1, 'Car insurance', '2020-01-10', 900),
        (1, 3, 1, 'Rent', '2020-02-10', 900),
        (1, 3, 1, 'Rent', '2020-03-10', 900),
        (1, 3, 1, 'Rent', '2020-04-10', 900),
        (1, 3, 1, 'Rent', '2020-05-10', 900),
        (1, 3, 1, 'Car insurance', NOW(), 30)
        ;
