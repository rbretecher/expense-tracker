package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type DeleteArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *ProjectService) Delete(r *http.Request, args *DeleteArgs, reply *service.NoReply) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasProject(session.UserID, args.ID); err != nil {
		return err
	}

	result, err := s.DB.Exec(`
		DELETE
		FROM projects
		WHERE id = $1
	`, args.ID)

	return service.HandleDelete(result, err)
}
