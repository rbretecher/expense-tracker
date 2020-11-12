package auth

import (
	"fmt"
	"os"

	"github.com/dgrijalva/jwt-go"
)

const header string = "authorization"
const jwtEnv string = "JWT_PRIVATE_KEY"

// JWTContent represents the content of a JWT token.
type JWTContent struct {
	UserID int
}

// SignJWT creates and signs a JWT token with the provided content.
func SignJWT(content *JWTContent) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": content.UserID,
	})

	return token.SignedString([]byte(os.Getenv(jwtEnv)))
}

// validateJWT asserts that the provided token is valid and returns its content.
func validateJWT(tokenString string) (*JWTContent, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv(jwtEnv)), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID, ok := claims["userId"].(float64)

		if ok {
			return &JWTContent{
				UserID: int(userID),
			}, nil
		}
	}

	return nil, fmt.Errorf("could not read JWT content")
}
