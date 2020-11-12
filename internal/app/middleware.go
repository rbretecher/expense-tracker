package app

import (
	"github.com/gorilla/rpc/v2"
	"github.com/rbretecher/expense-tracker-back/internal/auth"
	"github.com/rbretecher/expense-tracker-back/pkg/validator"
)

func middleware(r *rpc.RequestInfo, i interface{}) error {
	s := auth.GetSession(r.Request)

	if s != nil && s.AuthErr != nil {
		return s.AuthErr
	}

	return validator.Validate.Struct(i)
}
