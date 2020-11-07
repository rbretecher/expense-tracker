package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rbretecher/expense-tracker-back/internal/handlers"
	"github.com/rbretecher/expense-tracker-back/internal/infrastructure/database"
)

func main() {
	r := gin.Default()

	db := database.Init()

	r.GET("/collections", handlers.GetCollections(db))
	r.POST("/collection", handlers.CreateCollection(db))

	r.Run()
}
