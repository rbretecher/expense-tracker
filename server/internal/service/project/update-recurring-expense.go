package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type UpdateRecurringExpenseArgs struct {
	ID int `json:"id" validate:"required"`

	CategoryID   *int    `json:"categoryId"`
	PaidByUserID *int    `json:"paidByUserId"`
	Name         string  `json:"name" validate:"required"`
	Price        float32 `json:"price" validate:"gt=0"`
	StartPeriod  string  `json:"startPeriod" validate:"required,datetime=2006-01-02"`
	EndPeriod    *string `json:"endPeriod" validate:"omitempty,datetime=2006-01-02"`
}

func (s *ProjectService) UpdateRecurringExpense(r *http.Request, args *UpdateRecurringExpenseArgs, reply *domain.RecurringExpense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasRecurringExpense(session.UserID, args.ID); err != nil {
		return err
	}

	err := s.DB.QueryRow(`
		UPDATE recurring_expenses
		SET category_id = $1, paid_by_user_id = $2, name = $3, price = $4, start_period = $5, end_period = $6
		WHERE id = $7
		RETURNING id, project_id, category_id, paid_by_user_id, name, price, start_period, end_period
	`, args.CategoryID, args.PaidByUserID, args.Name, args.Price, args.StartPeriod, args.EndPeriod, args.ID).
		Scan(&reply.ID, &reply.ProjectID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Price, &reply.StartPeriod, &reply.EndPeriod)

	return service.HandleUpdate(err)
}
