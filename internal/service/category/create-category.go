package category

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type CreateArgs struct {
	Name      string `json:"name" validate:"required"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *CategoryService) Create(r *http.Request, args *CreateArgs, reply *domain.Category) error {
	return s.db.QueryRow(`
		INSERT INTO categories (name, icon_name, icon_color)
		VALUES ($1, $2, $3)
		RETURNING id, name, icon_name, icon_color
	`, args.Name, args.IconName, args.IconColor).Scan(&reply.ID, &reply.Name, &reply.IconName, &reply.IconColor)
}
