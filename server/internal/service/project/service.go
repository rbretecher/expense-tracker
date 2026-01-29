package project

import (
	"time"

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

func (s *ProjectService) getProjectRecurringExpenses(projectID int) ([]*domain.RecurringExpense, error) {
	recurringExpenses := make([]*domain.RecurringExpense, 0)
	err := s.DB.Select(&recurringExpenses, `
		SELECT re.*
		FROM recurring_expenses re
		WHERE re.project_id = $1
		ORDER BY re.name;
	`, projectID)

	return recurringExpenses, err
}

func (s *ProjectService) getProjectSuggestedExpenses(projectID int, monthStart time.Time) ([]*domain.RecurringExpense, error) {
	suggested := make([]*domain.RecurringExpense, 0)

	nextMonthStart := time.Date(monthStart.Year(), monthStart.Month()+1, 1, 0, 0, 0, 0, monthStart.Location())

	err := s.DB.Select(&suggested, `
		SELECT re.*
		FROM recurring_expenses re
		WHERE re.project_id = $1
		  AND re.start_period < $3
		  AND (re.end_period IS NULL OR re.end_period >= $2)
		  AND NOT EXISTS (
			  SELECT 1
			  FROM recurring_expense_instances rei
			  WHERE rei.recurring_expense_id = re.id
			    AND rei.period = $2
		  )
		ORDER BY re.name;
	`, projectID, monthStart, nextMonthStart)

	return suggested, err
}
