package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type UpdateArgs struct {
	ID        int    `json:"id" validate:"required"`
	Name      string `json:"name" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
	Admin     bool   `json:"admin"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *UserService) Update(r *http.Request, args *UpdateArgs, reply *domain.User) error {
	err := s.db.
		QueryRow(`
			UPDATE users
			SET name = $2, email = $3, password = $4, admin = $5, icon_name = $6, icon_color = $7
			WHERE id = $1
			RETURNING id, name, email, password, admin, icon_name, icon_color
		`, args.ID, args.Name, args.Email, args.Password, args.Admin, args.IconName, args.IconColor).
		Scan(&reply.ID, &reply.Name, &reply.Email, &reply.Password, &reply.Admin, &reply.IconName, &reply.IconColor)

	return service.HandleUpdate(err)
}
