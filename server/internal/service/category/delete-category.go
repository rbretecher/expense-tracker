package category

import (
	"errors"
	"net/http"

	"github.com/lib/pq"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

const (
	pqRestrictViolation pq.ErrorCode = "23001"
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
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == pqRestrictViolation {
			return domain.CategoryIsUsedError(err)
		}
		return domain.CouldNotDeleteEntityError(err)
	}

	return service.HandleDelete(result, nil)
}
