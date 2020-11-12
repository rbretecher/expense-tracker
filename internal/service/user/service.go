package user

import (
	"github.com/jmoiron/sqlx"
)

type UserService struct {
	db *sqlx.DB
}

func NewService(db *sqlx.DB) *UserService {
	return &UserService{
		db: db,
	}
}
