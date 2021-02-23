package expense

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type CreateArgs struct {
	ProjectID    int     `json:"projectId" validate:"required"`
	CategoryID   int     `json:"categoryId" validate:"required"`
	PaidByUserID int     `json:"paidByUserId" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	Date         string  `json:"date" validate:"required,datetime=2006-01-02"`
	Price        float32 `json:"price" validate:"required"`
}

func (s *ExpenseService) Create(r *http.Request, args *CreateArgs, reply *domain.Expense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ProjectID); err != nil {
		return err
	}

	err := s.DB.
		QueryRow(`
			INSERT INTO expenses (project_id, category_id, paid_by_user_id, name, date, price)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id, project_id, category_id, paid_by_user_id, name, date, price
		`, args.ProjectID, args.CategoryID, args.PaidByUserID, args.Name, args.Date, args.Price).
		Scan(&reply.ID, &reply.ProjectID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Date, &reply.Price)

	return service.HandleCreate(err)
}
