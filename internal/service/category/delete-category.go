package category

import (
	"errors"
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type DeleteArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *CategoryService) Delete(r *http.Request, args *DeleteArgs, reply *service.NoReply) error {
	result, err := s.db.Exec(`
		DELETE
		FROM categories
		WHERE id = $1
	`, args.ID)

	if err != nil {
		return domain.CouldNotDeleteEntityError(err)
	}

	rows, err := result.RowsAffected()

	if err != nil {
		return domain.CouldNotDeleteEntityError(err)
	}

	if rows != 1 {
		return domain.EntityDoesNotExistError(errors.New("no row updated"))
	}

	return domain.CouldNotDeleteEntityError(errors.New("unexpected error while trying to delete the entity"))
}