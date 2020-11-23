package expense

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type GetArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *ExpenseService) Get(r *http.Request, args *GetArgs, reply *[]*domain.Expense) error {
	session := auth.GetSession(r)

	// Primitives types are marshalled as "null".
	// With this, empty slice will be marshalled as "[]".
	*reply = make([]*domain.Expense, 0)

	return s.DB.Select(reply, `
		SELECT e.*
		FROM expenses e
		JOIN collections c ON (e.collection_id = c.id)
		JOIN user_has_collection uhc ON (c.id = uhc.collection_id)
		WHERE c.id = $1 AND uhc.user_id = $2
		ORDER BY e.date ASC;
	`, args.ID, session.UserID)
}
