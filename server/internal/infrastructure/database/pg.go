package database

import (
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func Connect() *sqlx.DB {
	db, err := sqlx.Connect("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatalln(err)
	}

	return db
}
