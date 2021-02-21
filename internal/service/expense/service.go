package expense

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type ExpenseService struct {
	service.Service
}

func NewService(db *sqlx.DB) *ExpenseService {
	return &ExpenseService{
		Service: service.Service{
			DB: db,
		},
	}
}
