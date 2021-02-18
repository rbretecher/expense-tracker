package main

import (
	"github.com/rbretecher/expense-tracker/server/internal/app"
)

func main() {
	app := app.New()
	app.Start()
}
