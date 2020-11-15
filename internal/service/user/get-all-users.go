package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

func (s *UserService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.User) error {
	err := s.db.Select(reply, `
		SELECT *
		FROM users
		ORDER BY id
	`)

	if err != nil {
		return domain.CouldNotFetchEntitiesError(err)
	}

	return nil
}
