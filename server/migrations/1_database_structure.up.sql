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

INSERT INTO users (name, email, password, admin, icon_name, icon_color) VALUES ('Admin', 'admin@demo.com', '$2a$06$uLh3Grumtw461OEI5R4EAuqJ.649jnXEl./Z6v58bG9Rz4dkbpgae', true, 'face', 'blue-10');
