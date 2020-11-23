package collection

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

func (s *CollectionService) All(r *http.Request, args *service.NoArgs, reply *[]*domain.Collection) error {
	session := auth.GetSession(r)

	return s.DB.Select(reply, `
		SELECT c.*, (SELECT COUNT(*) FROM expenses WHERE collection_id = c.id) AS count
		FROM collections c
		JOIN user_has_collection uhc ON (c.id = uhc.collection_id)
		WHERE uhc.user_id = $1
		ORDER BY c.id
	`, session.UserID)
}
