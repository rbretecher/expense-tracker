package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type AddUserArgs struct {
	ProjectID int     `json:"projectId" validate:"required"`
	UserID    int     `json:"userId" validate:"required"`
	Weight    float32 `json:"weight" validate:"gt=0"`
}

func (s *ProjectService) AddUser(r *http.Request, args *AddUserArgs, reply *domain.UserHasProject) error {
	session := auth.GetSession(r)

	if err := s.CheckUserIsAdmin(session.UserID); err != nil {
		return err
	}

	err := s.DB.QueryRow(`
		INSERT INTO user_has_project (user_id, project_id, weight)
		VALUES ($1, $2, $3)
		RETURNING user_id, project_id, weight
	`, args.UserID, args.ProjectID, args.Weight).Scan(&reply.UserID, &reply.ProjectID, &reply.Weight)

	return service.HandleCreate(err)
}
