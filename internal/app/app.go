package app

import (
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

type app struct {
	server *rpc.Server
	db     *sqlx.DB
}

func New() app {
	db := database.Connect()

	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCodec(), "application/json")
	s.RegisterInterceptFunc(auth.Middleware)
	s.RegisterValidateRequestFunc(middleware)
	s.RegisterService(service.NewUserService(db), "User")
	s.RegisterService(service.NewCollectionService(db), "Collection")

	return app{
		server: s,
		db:     db,
	}
}

func (a app) Start() {
	http.Handle("/rpc", a.server)
	http.ListenAndServe(":8080", nil)
}
