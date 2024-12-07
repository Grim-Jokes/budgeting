package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello",
		})
	})

	port, exists := os.LookupEnv("PORT")

	if !exists {
		port = "3000"
	}

	r.Run("0.0.0.0:" + port)
}
