package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type RemoveUserArgs struct {
	ProjectID int `json:"projectId" validate:"required"`
	UserID    int `json:"userId" validate:"required"`
}

func (s *ProjectService) RemoveUser(r *http.Request, args *RemoveUserArgs, reply *service.NoReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserIsAdmin(session.UserID); err != nil {
		return err
	}

	result, err := s.DB.Exec(`
		DELETE
		FROM user_has_project
		WHERE project_id = $1 AND user_id = $2
	`, args.ProjectID, args.UserID)

	return service.HandleDelete(result, err)
}
