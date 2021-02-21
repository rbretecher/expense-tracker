package main

import (
	"github.com/rbretecher/expense-tracker/internal/app"
)

func main() {
	app := app.New()
	app.Start()
}
