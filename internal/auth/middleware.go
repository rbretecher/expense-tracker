package auth

import (
	"errors"
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/rbretecher/expense-tracker/internal/domain"
)

// Middleware asserts provided JWT token is valid if method requires authorization.
// It also adds the JWT content inside the request's context.
func Middleware(i *rpc.RequestInfo) *http.Request {
	if i.Method != "User.Login" {
		authorizationString := i.Request.Header.Get(header)
		if authorizationString == "" || len(authorizationString) < 7 {
			return requestWithSession(i.Request, Session{
				AuthErr: domain.AuthenticationRequiredError(errors.New("invalid authorization header")),
			})
		}

		content, err := validateJWT(authorizationString[7:])

		if err != nil {
			return requestWithSession(i.Request, Session{
				AuthErr: domain.InvalidAuthenticationError(err),
			})
		}

		return requestWithSession(i.Request, Session{
			UserID: content.UserID,
		})
	}

	return nil
}
