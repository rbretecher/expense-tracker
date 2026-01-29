package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
)

type GetSummaryArgs struct {
	ID int `json:"id" validate:"required"`
}

type ExpensesByMonth struct {
	Year  string  `json:"year"`
	Month string  `json:"month"`
	Count int     `json:"count"`
	Price float32 `json:"price"`
}

type GetSummaryReply struct {
	domain.Project
	ExpensesByMonth   []*ExpensesByMonth         `json:"expensesByMonth"`
	Users             []*domain.ProjectUser      `json:"users"`
	RecurringExpenses []*domain.RecurringExpense `json:"recurringExpenses"`
}

func (s *ProjectService) GetSummary(r *http.Request, args *GetSummaryArgs, reply *GetSummaryReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ID); err != nil {
		return err
	}

	project, err := s.getProject(args.ID)
	if err != nil {
		return err
	}
	reply.Project = project

	reply.ExpensesByMonth = make([]*ExpensesByMonth, 0)
	if err := s.DB.Select(&reply.ExpensesByMonth, `
		SELECT to_char(date, 'YYYY') AS year, to_char(date, 'MM') AS month, COUNT(*) AS count, SUM(price) AS price
		FROM expenses
		WHERE project_id = $1
		GROUP BY to_char(date, 'YYYY'), to_char(date, 'MM')
		ORDER BY year DESC, month DESC;
	`, args.ID); err != nil {
		return err
	}

	users, err := s.getProjectUsers(args.ID)
	if err != nil {
		return err
	}
	reply.Users = users

	recurringExpenses, err := s.getProjectRecurringExpenses(args.ID)
	if err != nil {
		return err
	}
	reply.RecurringExpenses = recurringExpenses

	return nil
}
