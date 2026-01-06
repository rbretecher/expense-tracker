package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type DeleteRecurringExpenseArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *ProjectService) DeleteRecurringExpense(r *http.Request, args *DeleteRecurringExpenseArgs, reply *service.NoReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasRecurringExpense(session.UserID, args.ID); err != nil {
		return err
	}

	result, err := s.DB.Exec(`
		DELETE
		FROM recurring_expenses
		WHERE id = $1
	`, args.ID)

	return service.HandleDelete(result, err)
}
