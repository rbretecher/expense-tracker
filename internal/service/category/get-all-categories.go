package category

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

func (s *CategoryService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.Category) error {
	return s.db.Select(reply, `
		SELECT *
		FROM categories
		ORDER BY name
	`)
}
