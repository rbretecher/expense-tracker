ALTER TABLE expenses
    DROP CONSTRAINT expenses_category_id_fkey,
    ADD CONSTRAINT expenses_category_id_fkey
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL;

ALTER TABLE recurring_expenses
    DROP CONSTRAINT recurring_expenses_category_id_fkey,
    ADD CONSTRAINT recurring_expenses_category_id_fkey
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL;

ALTER TABLE expenses
    ALTER COLUMN category_id
    DROP NOT NULL;

ALTER TABLE recurring_expenses
    ALTER COLUMN category_id
    DROP NOT NULL;
