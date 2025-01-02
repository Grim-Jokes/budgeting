package main

import (
	"os"

	"api/app/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.POST("/upload", handlers.HandleImageUpload)

	port, exists := os.LookupEnv("PORT")

	if !exists {
		port = "3000"
	}

	r.Run("0.0.0.0:" + port)
}
