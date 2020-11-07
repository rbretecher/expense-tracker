package database

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func Init() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "host=db user=postgres password=postgres dbname=expense-tracker sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}

	return db
}
