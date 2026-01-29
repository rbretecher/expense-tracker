package expense

import (
	"fmt"
	"net/http"
	"time"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type CreateSuggestedArgs struct {
	ID           int     `json:"id" validate:"required"`
	ProjectID    int     `json:"projectId" validate:"required"`
	CategoryID   int     `json:"categoryId" validate:"required"`
	PaidByUserID int     `json:"paidByUserId" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	Date         string  `json:"date" validate:"required,datetime=2006-01-02"`
	Price        float32 `json:"price" validate:"required"`
}

func (s *ExpenseService) CreateSuggested(r *http.Request, args *CreateSuggestedArgs, reply *domain.Expense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ProjectID); err != nil {
		return err
	}

	tx, err := s.DB.Begin()
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback() }()

	t, err := time.Parse("2006-01-02", args.Date)
	if err != nil {
		return service.HandleCreate(err)
	}
	period := time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, t.Location()).Format("2006-01-02")

	var exists bool
	err = tx.QueryRow(`
		SELECT EXISTS (
			SELECT 1
			FROM recurring_expense_instances
			WHERE recurring_expense_id = $1 AND period = $2
		)
	`, args.ID, period).Scan(&exists)
	if err != nil {
		return service.HandleCreate(err)
	}
	if exists {
		return service.HandleCreate(fmt.Errorf("suggested expense already created for this period"))
	}

	err = tx.QueryRow(`
		INSERT INTO expenses (project_id, category_id, paid_by_user_id, name, date, price)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, project_id, category_id, paid_by_user_id, name, date, price
	`, args.ProjectID, args.CategoryID, args.PaidByUserID, args.Name, args.Date, args.Price).
		Scan(&reply.ID, &reply.ProjectID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Date, &reply.Price)
	if err != nil {
		return service.HandleCreate(err)
	}

	_, err = tx.Exec(`
		INSERT INTO recurring_expense_instances (recurring_expense_id, period, expense_id)
		VALUES ($1, $2, $3)
	`, args.ID, period, reply.ID)
	if err != nil {
		return service.HandleCreate(err)
	}

	if err := tx.Commit(); err != nil {
		return service.HandleCreate(err)
	}
	return nil
}
