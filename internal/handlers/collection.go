package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/rbretecher/expense-tracker-back/internal/domain"
	"github.com/rbretecher/expense-tracker-back/internal/service"
)

func GetCollections(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		collections, err := service.GetCollections(db)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusAccepted, gin.H{
			"collections": collections,
		})
	}
}

func CreateCollection(db *sqlx.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var collection domain.Collection
		err := c.ShouldBindJSON(&collection)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		collection, err = service.CreateCollection(db, collection)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"collection": collection,
		})
	}
}
