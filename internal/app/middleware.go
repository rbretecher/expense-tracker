package app

import (
	"github.com/gorilla/rpc/v2"
	"github.com/rbretecher/expense-tracker/internal/auth"
	"github.com/rbretecher/expense-tracker/internal/domain"
	"github.com/rbretecher/expense-tracker/pkg/validator"
)

func middleware(r *rpc.RequestInfo, i interface{}) error {
	s := auth.GetSession(r.Request)

	if s != nil && s.AuthErr != nil {
		return s.AuthErr
	}

	err := validator.Validate.Struct(i)

	if err != nil {
		return domain.BadParametersError(err)
	}

	return nil
}
