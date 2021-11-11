package project

import (
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/internal/service"
)

type ProjectService struct {
	service.Service
}

func NewService(db *sqlx.DB) *ProjectService {
	return &ProjectService{
		Service: service.Service{
			DB: db,
		},
	}
}

func (s *ProjectService) getProject(projectID int) (project domain.Project, err error) {
	err = s.DB.Get(&project, `
		SELECT p.*, (SELECT COUNT(*) FROM expenses WHERE project_id = p.id) AS count
		FROM projects p
		WHERE p.id = $1;
	`, projectID)

	return
}

func (s *ProjectService) getProjectUsers(projectID int) ([]*domain.ProjectUser, error) {
	users := make([]*domain.ProjectUser, 0)
	err := s.DB.Select(&users, `
		SELECT u.*, uhp.weight
		FROM users u
		JOIN user_has_project uhp ON (u.id = uhp.user_id)
		WHERE uhp.project_id = $1
		ORDER BY u.name;
	`, projectID)

	return users, err
}
