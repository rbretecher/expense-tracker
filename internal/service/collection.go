package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

func GetCollections(db *sqlx.DB) ([]domain.Collection, error) {
	collections := []domain.Collection{}
	err := db.Select(&collections, "SELECT * FROM collections;")
	return collections, err
}

func CreateCollection(db *sqlx.DB, c domain.Collection) (domain.Collection, error) {
	err := db.QueryRow(`
		INSERT INTO collections (name, icon_name, icon_color)
		VALUES ($1, $2, $3)
		RETURNING collection_id
	`, c.Name, c.IconName, c.IconColor).Scan(&c.ID)
	return c, err
}
