package validator

import (
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/rpc/v2"
)

var validate *validator.Validate = validator.New()

func Validate(r *rpc.RequestInfo, i interface{}) error {
	return validate.Struct(i)
}
