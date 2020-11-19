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

CREATE TABLE collections
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
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    collection_id INT REFERENCES collections(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR (255) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    price INT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE user_has_collection
(
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    collection_id INT REFERENCES collections(id) ON DELETE CASCADE,

    PRIMARY KEY(user_id, collection_id)
);

INSERT INTO users (name, email, password, admin, icon_name, icon_color) VALUES ('Romain', 'admin@demo.com', 'azerty', true, 'hotel', 'blue-1');
INSERT INTO users (name, email, password, admin, icon_name, icon_color) VALUES ('Madeline', 'madeline@demo.com', 'azerty', true, 'local_pizza', 'pink-1');

INSERT INTO categories (name, icon_name, icon_color) VALUES ('Groceries', 'local_grocery_store', 'blue-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Housing', 'hotel', 'red-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Car', 'local_taxi', 'green-10');
INSERT INTO categories (name, icon_name, icon_color) VALUES ('Food', 'local_pizza', 'brown-10');

INSERT INTO collections (name, icon_name, icon_color) VALUES ('2018', 'hotel', 'blue-10');
INSERT INTO collections (name, icon_name, icon_color) VALUES ('2019', 'hotel', 'blue-10');
INSERT INTO collections (name, icon_name, icon_color) VALUES ('2020', 'hotel', 'blue-10');
INSERT INTO collections (name, icon_name, icon_color) VALUES ('MDR', 'hotel', 'blue-10');

INSERT INTO user_has_collection (user_id, collection_id) VALUES (1, 1);
INSERT INTO user_has_collection (user_id, collection_id) VALUES (1, 2);
INSERT INTO user_has_collection (user_id, collection_id) VALUES (1, 3);
