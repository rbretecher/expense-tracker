package main

import (
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

func main() {
	s := rpc.NewServer()

	s.RegisterCodec(json2.NewCodec(), "application/json")
	s.RegisterCodec(json2.NewCodec(), "application/json;charset=UTF-8")

	db := database.Init()
	s.RegisterService(service.NewCollectionService(db), "")

	http.Handle("/rpc", s)
	http.ListenAndServe(":8080", nil)
}
