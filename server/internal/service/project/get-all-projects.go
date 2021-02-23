package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

func (s *ProjectService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.Project) error {
	session := auth.GetSession(r)

	// Primitives types are marshalled as "null".
	// With this, empty slice will be marshalled as "[]".
	*reply = make([]*domain.Project, 0)

	return s.DB.Select(reply, `
		SELECT p.*, (SELECT COUNT(*) FROM expenses WHERE project_id = p.id) AS count
		FROM projects p
		JOIN user_has_project uhc ON (p.id = uhc.project_id)
		WHERE uhc.user_id = $1
		ORDER BY p.id
	`, session.UserID)
}
