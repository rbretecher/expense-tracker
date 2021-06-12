package user

import (
	"database/sql"
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
)

type LoginArgs struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (s *UserService) Login(r *http.Request, args *LoginArgs, reply *domain.User) error {
	err := s.db.Get(reply, "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)", args.Email, args.Password)

	if err == sql.ErrNoRows {
		return domain.InvalidCredentialsError(err)
	}

	if err != nil {
		return err
	}

	reply.JWT, err = auth.SignJWT(&auth.JWTContent{
		UserID: reply.ID,
	})

	return err
}
