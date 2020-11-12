package auth

import (
	"context"
	"net/http"
)

type sessionContextKey string

var sessionKey sessionContextKey = "authorization"

// Session holds data about current user.
// This struct is stored inside the request's context.
type Session struct {
	AuthErr error
	UserID  int
}

// RequestWithSession clones the request and adds the session inside its context.
func requestWithSession(req *http.Request, s Session) *http.Request {
	if req == nil {
		return nil
	}

	return req.Clone(context.WithValue(req.Context(), sessionKey, s))
}

// GetSession returns the Session struct stored in request's context.
func GetSession(r *http.Request) *Session {
	if r == nil {
		return nil
	}

	s, ok := r.Context().Value(sessionKey).(Session)

	if !ok {
		return nil
	}

	return &s
}
