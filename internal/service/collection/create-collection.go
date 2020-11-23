package collection

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type CreateArgs struct {
	Name      string `json:"name" validate:"required"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *CollectionService) Create(r *http.Request, args *CreateArgs, reply *domain.Collection) error {
	session := auth.GetSession(r)

	tx, err := s.DB.Begin()

	if err != nil {
		return err
	}

	tx.QueryRow(`
		INSERT INTO collections (name, icon_name, icon_color)
		VALUES ($1, $2, $3)
		RETURNING id, name, icon_name, icon_color
	`, args.Name, args.IconName, args.IconColor).Scan(&reply.ID, &reply.Name, &reply.IconName, &reply.IconColor)

	tx.Exec(`
		INSERT INTO user_has_collection (user_id, collection_id)
		VALUES ($1, $2)
	`, session.UserID, reply.ID)

	return tx.Commit()
}
