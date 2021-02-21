package expense

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type UpdateArgs struct {
	ID           int     `json:"id" validate:"required"`
	CategoryID   int     `json:"categoryId" validate:"required"`
	PaidByUserID int     `json:"paidByUserId" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	Date         string  `json:"date" validate:"required,datetime=2006-01-02"`
	Price        float32 `json:"price" validate:"required"`
}

func (s *ExpenseService) Update(r *http.Request, args *UpdateArgs, reply *domain.Expense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasExpense(session.UserID, args.ID); err != nil {
		return err
	}

	err := s.DB.
		QueryRow(`
			UPDATE expenses
			SET category_id = $2, paid_by_user_id = $3, name = $4, date = $5, price = $6
			WHERE id = $1
			RETURNING id, project_id, category_id, paid_by_user_id, name, date, price
		`, args.ID, args.CategoryID, args.PaidByUserID, args.Name, args.Date, args.Price).
		Scan(&reply.ID, &reply.ProjectID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Date, &reply.Price)

	return service.HandleUpdate(err)
}
