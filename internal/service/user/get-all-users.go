package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

func (s *UserService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.User) error {

	// Primitives types are marshalled as "null".
	// With this, empty slice will be marshalled as "[]".
	*reply = make([]*domain.User, 0)

	err := s.db.Select(reply, `
		SELECT *
		FROM users
		ORDER BY id
	`)

	return service.HandleFetch(err)
}
