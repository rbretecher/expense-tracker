CREATE TABLE recurring_expenses
(
    id INT GENERATED ALWAYS AS IDENTITY,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    paid_by_user_id INT REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    start_period DATE NOT NULL,
    end_period DATE,
    PRIMARY KEY (id)
);

CREATE TABLE recurring_expense_instances
(
    recurring_expense_id INT NOT NULL REFERENCES recurring_expenses(id) ON DELETE CASCADE,
    period DATE NOT NULL,
    expense_id INT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    PRIMARY KEY (recurring_expense_id, period)
);
