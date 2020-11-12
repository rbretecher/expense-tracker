package collection

import (
	"github.com/jmoiron/sqlx"
)

type CollectionService struct {
	db *sqlx.DB
}

func NewService(db *sqlx.DB) *CollectionService {
	return &CollectionService{
		db: db,
	}
}
