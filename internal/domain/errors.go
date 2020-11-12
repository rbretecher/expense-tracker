package domain

import "github.com/gorilla/rpc/v2/json2"

var AuthenticationRequiredError = &json2.Error{
	Code:    -32000,
	Message: "Authentication required",
}

var InvalidAuthenticationError = &json2.Error{
	Code:    -32001,
	Message: "Invalid authentication",
}
