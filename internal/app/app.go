package app

import (
	"net/http"
	"os"

	"github.com/justinas/alice"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker-back/internal/service/collection"
	"github.com/rbretecher/expense-tracker-back/internal/service/user"
	"github.com/rs/cors"
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
	s.RegisterService(user.NewService(db), "User")
	s.RegisterService(collection.NewService(db), "Collection")

	return app{
		server: s,
		db:     db,
	}
}

func (a app) Start() {
	chain := alice.New(cors.Default().Handler)

	http.Handle("/rpc", chain.Then(a.server))
	http.ListenAndServe(":"+os.Getenv("HTTP_PORT"), nil)
}
