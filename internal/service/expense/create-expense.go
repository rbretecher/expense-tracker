package expense

import (
	"net/http"

	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type CreateArgs struct {
	CollectionID int     `json:"collectionId" validate:"required"`
	CategoryID   int     `json:"categoryId" validate:"required"`
	PaidByUserID int     `json:"paidByUserId" validate:"required"`
	Name         string  `json:"name" validate:"required"`
	Date         string  `json:"date" validate:"required,datetime=2006-01-02"`
	Price        float32 `json:"price" validate:"required"`
}

func (s *ExpenseService) Create(r *http.Request, args *CreateArgs, reply *domain.Expense) error {
	session := auth.GetSession(r)

	if err := s.CheckUserHasCollection(session.UserID, args.CollectionID); err != nil {
		return err
	}

	err := s.DB.
		QueryRow(`
			INSERT INTO expenses (collection_id, category_id, paid_by_user_id, name, date, price)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id, collection_id, category_id, paid_by_user_id, name, date, price
		`, args.CollectionID, args.CategoryID, args.PaidByUserID, args.Name, args.Date, args.Price).
		Scan(&reply.ID, &reply.CollectionID, &reply.CategoryID, &reply.PaidByUserID, &reply.Name, &reply.Date, &reply.Price)

	return service.HandleCreate(err)
}
