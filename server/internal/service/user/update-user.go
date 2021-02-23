package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type UpdateArgs struct {
	ID        int    `json:"id" validate:"required"`
	Name      string `json:"name" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Admin     bool   `json:"admin"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *UserService) Update(r *http.Request, args *UpdateArgs, reply *domain.User) error {
	err := s.db.
		QueryRow(`
			UPDATE users
			SET name = $2, email = $3, admin = $4, icon_name = $5, icon_color = $6
			WHERE id = $1
			RETURNING id, name, email, password, admin, icon_name, icon_color
		`, args.ID, args.Name, args.Email, args.Admin, args.IconName, args.IconColor).
		Scan(&reply.ID, &reply.Name, &reply.Email, &reply.Password, &reply.Admin, &reply.IconName, &reply.IconColor)

	return service.HandleUpdate(err)
}
