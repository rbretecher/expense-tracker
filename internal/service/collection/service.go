package collection

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type CollectionService struct {
	service.Service
}

func NewService(db *sqlx.DB) *ExpenseService {
	return &CollectionService{
		Service: service.Service{
			DB: db,
		},
	}
}
