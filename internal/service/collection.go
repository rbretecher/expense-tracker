package service

import (
	"net/http"

	"github.com/jmoiron/sqlx"
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
	Name      string `json:"name"`
	IconName  string `json:"iconName"`
	IconColor string `json:"iconColor"`
}

func (s *CollectionService) Create(r *http.Request, args *CreateArgs, reply *domain.Collection) error {
	return s.db.QueryRow(`
			INSERT INTO collections (name, icon_name, icon_color)
			VALUES ($1, $2, $3)
			RETURNING collection_id, name, icon_name, icon_color
		`, args.Name, args.IconName, args.IconColor).Scan(&reply.ID, &reply.Name, &reply.IconName, &reply.IconColor)
}

type GetArgs struct {
	CollectionID int `json:"collection_id"`
}

func (s *CollectionService) Get(r *http.Request, args *GetArgs, reply *domain.Collection) error {
	return s.db.Get(reply, "SELECT * FROM collections WHERE collection_id = $1", args.CollectionID)
}
