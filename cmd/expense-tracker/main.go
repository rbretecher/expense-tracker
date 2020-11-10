package main

import (
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
	"github.com/rbretecher/expense-tracker-back/internal/service"
	"github.com/rbretecher/expense-tracker-back/pkg/validator"
)

func main() {
	db := database.Connect()

	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCodec(), "application/json")
	s.RegisterCodec(json2.NewCodec(), "application/json;charset=UTF-8")
	s.RegisterValidateRequestFunc(validator.Validate)
	s.RegisterService(service.NewCollectionService(db), "Collection")

	http.Handle("/rpc", s)
	http.ListenAndServe(":8080", nil)
}
