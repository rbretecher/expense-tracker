package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type GetArgs struct {
	ID int `json:"id" validate:"required"`
}

type GetReply struct {
	domain.Project
	Expenses []*domain.Expense `json:"expenses"`
	Users    []*domain.User    `json:"users"`
}

func (s *ProjectService) Get(r *http.Request, args *GetArgs, reply *GetReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ID); err != nil {
		return err
	}

	if err := s.DB.Get(reply, `
		SELECT p.*
		FROM projects p
		JOIN user_has_project uhp ON (p.id = uhp.project_id)
		WHERE p.id = $1;
	`, args.ID); err != nil {
		return err
	}

	reply.Expenses = make([]*domain.Expense, 0)
	if err := s.DB.Select(&reply.Expenses, `
		SELECT *
		FROM expenses
		WHERE project_id = $1;
	`, args.ID); err != nil {
		return err
	}

	reply.Users = make([]*domain.User, 0)
	if err := s.DB.Select(&reply.Users, `
		SELECT u.*
		FROM users u
		JOIN user_has_project uhp ON (u.id = uhp.user_id)
		WHERE uhp.project_id = $1;
	`, args.ID); err != nil {
		return err
	}

	return nil
}
