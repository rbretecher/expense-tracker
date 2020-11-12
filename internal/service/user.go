package service

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type UserService struct {
	db *sqlx.DB
}

func NewUserService(db *sqlx.DB) *UserService {
	return &UserService{
		db: db,
	}
}

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
