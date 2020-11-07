CREATE TABLE users
(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    admin BOOLEAN NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(user_id)
);

CREATE TABLE collections
(
    collection_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(collection_id)
);

CREATE TABLE categories
(
    category_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    icon_name VARCHAR (255) NOT NULL,
    icon_color VARCHAR (255) NOT NULL,

    PRIMARY KEY(category_id)
);

CREATE TABLE expenses
(
    expense_id INT GENERATED ALWAYS AS IDENTITY,
    category_id INT REFERENCES categories(category_id),
    collection_id INT REFERENCES collections(collection_id),
    user_id INT REFERENCES users(user_id),
    name VARCHAR (255) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    price INT NOT NULL,

    PRIMARY KEY(expense_id)
);
