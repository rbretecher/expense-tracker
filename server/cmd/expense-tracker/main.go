package main

import (
	"github.com/rbretecher/expense-tracker-back/internal/app"
)

func main() {
	app := app.New()
	app.Start()
}
