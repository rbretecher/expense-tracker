package project

import (
	"net/http"

	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type UpdateUserArgs struct {
	ProjectID int     `json:"projectId" validate:"required"`
	UserID    int     `json:"userId" validate:"required"`
	Weight    float32 `json:"weight" validate:"required,gt=0"`
}

func (s *ProjectService) UpdateUser(r *http.Request, args *UpdateUserArgs, reply *domain.UserHasProject) error {
	err := s.DB.QueryRow(`
		UPDATE user_has_project
		SET weight = $1
		WHERE user_id = $2 AND project_id = $3
		RETURNING project_id, user_id, weight
	`, args.Weight, args.UserID, args.ProjectID).Scan(&reply.ProjectID, &reply.UserID, &reply.Weight)

	return service.HandleUpdate(err)
}
