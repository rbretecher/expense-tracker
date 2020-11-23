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

	if err := s.CheckUserHasCollection(session.UserID, args.ID); err != nil {
		return err
	}

	return s.DB.Get(reply, `
		SELECT c.*
		FROM collections c
		WHERE id = $1
	`, args.ID)
}
