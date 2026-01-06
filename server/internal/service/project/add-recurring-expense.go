package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type AddRecurringExpenseArgs struct {
	ProjectID    int     `json:"projectId" validate:"required"`
	CategoryID   *int    `json:"categoryId"`
	PaidByUserID *int    `json:"paidByUserId"`
	Name         string  `json:"name" validate:"required"`
	Price        float32 `json:"price" validate:"gt=0"`
	StartPeriod  string  `json:"startPeriod" validate:"required,datetime=2006-01-02"`
	EndPeriod    *string `json:"endPeriod" validate:"omitempty,datetime=2006-01-02"`
}

func (s *ProjectService) AddRecurringExpense(r *http.Request, args *AddRecurringExpenseArgs, reply *domain.RecurringExpense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ProjectID); err != nil {
		return err
	}

	err := s.DB.QueryRow(`
		INSERT INTO recurring_expenses (project_id, category_id, paid_by_user_id, name, price, start_period, end_period)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id, project_id, category_id, paid_by_user_id, name, price, start_period, end_period
	`, args.ProjectID, args.CategoryID, args.PaidByUserID, args.Name, args.Price, args.StartPeriod, args.EndPeriod).
		Scan(&reply.ID, &reply.ProjectID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Price, &reply.StartPeriod, &reply.EndPeriod)

	return service.HandleCreate(err)
}
