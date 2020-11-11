package app

import (
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker-back/internal/service"
	"github.com/rbretecher/expense-tracker-back/pkg/validator"
)

type app struct {
	server *rpc.Server
	db     *sqlx.DB
}

func New() app {
	db := database.Connect()

	s := rpc.NewServer()

	s.RegisterCodec(json2.NewCodec(), "application/json")
	s.RegisterCodec(json2.NewCodec(), "application/json;charset=UTF-8")
	s.RegisterValidateRequestFunc(func(r *rpc.RequestInfo, i interface{}) error {
		return validator.Validate.Struct(i)
	})
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
