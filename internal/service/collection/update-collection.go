package collection

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type UpdateArgs struct {
	ID        int    `json:"id" validate:"required"`
	Name      string `json:"name" validate:"required"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *CollectionService) Update(r *http.Request, args *UpdateArgs, reply *domain.Collection) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasCollection(session.UserID, args.ID); err != nil {
		return err
	}

	err := s.DB.QueryRow(`
		UPDATE collections
		SET name = $2, icon_name = $3, icon_color = $4
		WHERE id = $1
		RETURNING id, name, icon_name, icon_color
	`, args.ID, args.Name, args.IconName, args.IconColor).Scan(&reply.ID, &reply.Name, &reply.IconName, &reply.IconColor)

	return service.HandleUpdate(err)
}
