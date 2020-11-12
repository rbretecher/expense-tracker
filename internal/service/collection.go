package service

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
)

type CollectionService struct {
	db *sqlx.DB
}

func NewCollectionService(db *sqlx.DB) *CollectionService {
	return &CollectionService{
		db: db,
	}
}

func (s *CollectionService) All(r *http.Request, args *NoArgs, reply *[]*domain.Collection) error {
	return s.db.Select(reply, "SELECT * FROM collections")
}

type CreateArgs struct {
	Name      string `json:"name" validate:"required"`
	IconName  string `json:"iconName" validate:"required"`
	IconColor string `json:"iconColor" validate:"required"`
}

func (s *CollectionService) Create(r *http.Request, args *CreateArgs, reply *domain.Collection) error {
	return s.db.QueryRow(`
			INSERT INTO collections (name, icon_name, icon_color)
			VALUES ($1, $2, $3)
			RETURNING id, name, icon_name, icon_color
		`, args.Name, args.IconName, args.IconColor).Scan(&reply.ID, &reply.Name, &reply.IconName, &reply.IconColor)
}

type GetArgs struct {
	ID int `json:"id" validate:"required"`
}

func (s *CollectionService) Get(r *http.Request, args *GetArgs, reply *domain.Collection) error {
	return s.db.Get(reply, "SELECT * FROM collections WHERE id = $1", args.ID)
}
