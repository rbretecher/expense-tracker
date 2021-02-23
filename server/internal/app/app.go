package app

import (
	"net/http"
	"os"

	"github.com/justinas/alice"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker/internal/service/category"
	"github.com/rbretecher/expense-tracker/internal/service/expense"
	"github.com/rbretecher/expense-tracker/internal/service/project"
	"github.com/rbretecher/expense-tracker/internal/service/user"
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
	s.RegisterService(project.NewService(db), "Project")
	s.RegisterService(category.NewService(db), "Category")
	s.RegisterService(expense.NewService(db), "Expense")

	return app{
		server: s,
		db:     db,
	}
}

func (a app) Start() {
	chain := alice.New(cors.AllowAll().Handler)

	http.Handle("/", http.FileServer(http.Dir("./web/dist/spa/")))
	http.Handle("/rpc", chain.Then(a.server))

	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
