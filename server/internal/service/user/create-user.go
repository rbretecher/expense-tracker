package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type CreateArgs struct {
	Name      string `json:"name" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
	Admin     bool   `json:"admin"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *UserService) Create(r *http.Request, args *CreateArgs, reply *domain.User) error {
	err := s.db.
		QueryRow(`
			INSERT INTO users (name, email, password, admin, icon_name, icon_color)
			VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5, $6)
			RETURNING id, name, email, password, admin, icon_name, icon_color
		`, args.Name, args.Email, args.Password, args.Admin, args.IconName, args.IconColor).
		Scan(&reply.ID, &reply.Name, &reply.Email, &reply.Password, &reply.Admin, &reply.IconName, &reply.IconColor)

	return service.HandleCreate(err)
}
