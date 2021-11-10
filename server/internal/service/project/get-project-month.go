package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
)

type GetMonthArgs struct {
	ID    int    `json:"id" validate:"required"`
	Month string `json:"month" validate:"required"`
}

type GetMonthReply struct {
	domain.Project
	Expenses []*domain.Expense     `json:"expenses"`
	Users    []*domain.ProjectUser `json:"users"`
}

func (s *ProjectService) GetMonth(r *http.Request, args *GetMonthArgs, reply *GetMonthReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ID); err != nil {
		return err
	}

	// Get project.
	project, err := s.getProject(args.ID)
	if err != nil {
		return err
	}
	reply.Project = project

	// Get expenses.
	reply.Expenses = make([]*domain.Expense, 0)
	if err := s.DB.Select(&reply.Expenses, `
		SELECT *
		FROM expenses
		WHERE project_id = $1 AND to_char(date, 'YYYY-MM') = $2
		ORDER BY date ASC;
	`, args.ID, args.Month); err != nil {
		return err
	}

	// Get users.
	users, err := s.getProjectUsers(args.ID)
	if err != nil {
		return err
	}
	reply.Users = users

	return nil
}
