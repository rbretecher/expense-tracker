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
    category_id INT REFERENCES categories(id),
    collection_id INT REFERENCES collections(id),
    user_id INT REFERENCES users(id),
    name VARCHAR (255) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    price INT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE user_has_collection
(
    user_id INT REFERENCES users(id),
    collection_id INT REFERENCES collections(id),

    PRIMARY KEY(user_id, collection_id)
);
