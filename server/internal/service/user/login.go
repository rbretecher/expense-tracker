package user

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/server/internal/auth"
	"github.com/rbretecher/expense-tracker/server/internal/domain"
)

type LoginArgs struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (s *UserService) Login(r *http.Request, args *LoginArgs, reply *domain.User) error {
	err := s.db.Get(reply, "SELECT * FROM users WHERE email = $1 AND password = $2", args.Email, args.Password)

	if err != nil {
		return err
	}

	reply.JWT, err = auth.SignJWT(&auth.JWTContent{
		UserID: reply.ID,
	})

	return err
}
