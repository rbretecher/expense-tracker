package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker/internal/domain"
)

type Service struct {
	DB *sqlx.DB
}

func (s *Service) CheckUserHasExpense(userID int, expenseID int) error {
	var count int
	err := s.DB.Get(&count, `
		SELECT COUNT(*)
		FROM expenses e
		JOIN projects p ON (p.id = e.project_id)
		JOIN user_has_project uhc ON (uhc.project_id = p.id)
		WHERE uhc.user_id = $1 AND e.id = $2
	`, userID, expenseID)

	if err != nil || count != 1 {
		return domain.ForbiddenAccessToEntityError()
	}

	return nil
}

func (s *Service) CheckUserHasProject(userID int, projectID int) error {
	var count int
	err := s.DB.Get(&count, `
		SELECT COUNT(*)
		FROM user_has_project
		WHERE user_id = $1 AND project_id = $2
	`, userID, projectID)

	if err != nil || count != 1 {
		return domain.ForbiddenAccessToEntityError()
	}

	return nil
}

func (s *Service) CheckUserIsAdmin(userID int) error {
	var count int
	err := s.DB.Get(&count, `
		SELECT COUNT(*)
		FROM users
		WHERE id = $1 AND admin = true
	`, userID)

	if err != nil || count != 1 {
		return domain.ForbiddenAccessToEntityError()
	}

	return nil
}
