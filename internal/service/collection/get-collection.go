package collection

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type GetArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *CollectionService) Get(r *http.Request, args *GetArgs, reply *domain.Collection) error {
	session := auth.GetSession(r)

	return s.db.Get(reply, `
		SELECT c.*
		FROM collections c
		JOIN user_has_collection uhc ON (c.id = uhc.collection_id)
		WHERE id = $1 AND uhc.user_id = $2
	`, args.ID, session.UserID)
}
