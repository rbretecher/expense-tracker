package domain

import "github.com/gorilla/rpc/v2/json2"

/// Generic errors.

// AuthenticationRequiredError is the error when a user try to access a ressource that requires authentication and did not provide it.
func AuthenticationRequiredError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32000,
		Message: "Authentication required",
		Data:    err.Error(),
	}
}

// InvalidAuthenticationError is the error when a user provided an invalid authentication.
func InvalidAuthenticationError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32001,
		Message: "Invalid authentication",
		Data:    err.Error(),
	}
}

// ForbiddenAccessToEntityError is the error when a user try to interact with an entity that does not belong to him.
func ForbiddenAccessToEntityError() *json2.Error {
	return &json2.Error{
		Code:    -32002,
		Message: "Forbidden access to entity",
	}
}

// BadParametersError is the error when the provided payload does meet requirements.
func BadParametersError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32010,
		Message: "Bad parameters",
		Data:    err.Error(),
	}
}

// CouldNotFetchEntitiesError is the error when an internal error occurred while trying to fetch a collection of resources.
func CouldNotFetchEntitiesError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32020,
		Message: "Entities could not be fetched",
		Data:    err.Error(),
	}
}

// EntityDoesNotExistError is the error when trying to interact with a resource that does not exist.
func EntityDoesNotExistError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32021,
		Message: "Entity does not exist",
		Data:    err.Error(),
	}
}

// CouldNotDeleteEntityError is the error when an internal error occurred while trying to delete a resource.
func CouldNotDeleteEntityError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32022,
		Message: "Could not delete entity",
		Data:    err.Error(),
	}
}

// CouldNotCreateEntityError is the error when an internal error occurred while trying to create a resource.
func CouldNotCreateEntityError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32023,
		Message: "Could not create entity",
		Data:    err.Error(),
	}
}

/// Custom errors.

// InvalidCredentialsError is the error when a user provides a bad login/password.
func InvalidCredentialsError(err error) *json2.Error {
	return &json2.Error{
		Code:    -32100,
		Message: "Invalid credentials",
		Data:    err.Error(),
	}
}
