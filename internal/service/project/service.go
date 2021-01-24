package project

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type ProjectService struct {
	service.Service
}

func NewService(db *sqlx.DB) *ProjectService {
	return &ProjectService{
		Service: service.Service{
			DB: db,
		},
	}
}
