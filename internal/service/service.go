package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type Service struct {
	DB *sqlx.DB
}

func (s *Service) CheckUserHasExpense(userID int, expenseID int) error {
	var count int
	err := s.DB.Get(&count, `
		SELECT COUNT(*)
		FROM expenses e
		JOIN collections c ON (c.id = e.collection_id)
		JOIN user_has_collection uhc ON (uhc.collection_id = c.id)
		WHERE uhc.user_id = $1 AND e.id = $2
	`, userID, expenseID)

	if err != nil || count != 1 {
		return domain.ForbiddenAccessToEntityError()
	}

	return nil
}

func (s *Service) CheckUserHasCollection(userID int, collectionID int) error {
	var count int
	err := s.DB.Get(&count, `
		SELECT COUNT(*)
		FROM user_has_collection
		WHERE user_id = $1 AND collection_id = $2
	`, userID, collectionID)

	if err != nil || count != 1 {
		return domain.ForbiddenAccessToEntityError()
	}

	return nil
}
