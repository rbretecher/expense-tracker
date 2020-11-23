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
		SELECT c.*
		FROM collections c
		JOIN user_has_collection uhc ON (c.id = uhc.collection_id)
		WHERE uhc.user_id = $1
	`, session.UserID)
}
