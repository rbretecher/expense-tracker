package category

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

func (s *CategoryService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.Category) error {

	// Primitives types are marshalled as "null".
	// With this, empty slice will be marshalled as "[]".
	*reply = make([]*domain.Category, 0)

	err := s.db.Select(reply, `
		SELECT *
		FROM categories
		ORDER BY name
	`)

	return service.HandleFetch(err)
}
