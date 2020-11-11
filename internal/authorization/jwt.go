package authorization

import (
	"os"

	"github.com/dgrijalva/jwt-go"
)

func SignJWT(claims jwt.MapClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("JWT_PRIVATE_KEY")))
}
