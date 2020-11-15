package service

import (
	"database/sql"
	"errors"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type NoArgs struct{}

type NoReply struct{}

func HandleDelete(result sql.Result, err error) error {
	if err != nil {
		return domain.CouldNotDeleteEntityError(err)
	}

	rows, err := result.RowsAffected()

	if err != nil {
		return domain.CouldNotDeleteEntityError(err)
	}

	if rows != 1 {
		return domain.CouldNotDeleteEntityError(errors.New("no row deleted"))
	}

	return nil
}
