package category

import (
	"github.com/jmoiron/sqlx"
)

type CategoryService struct {
	db *sqlx.DB
}

func NewService(db *sqlx.DB) *CategoryService {
	return &CategoryService{
		db: db,
	}
}
