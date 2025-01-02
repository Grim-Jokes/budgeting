package handlers

import (
	"api/infra/ocr"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func HandleImageUpload(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve the file"})
		return
	}

	if err := c.SaveUploadedFile(file, "uploaded_image.jpg"); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
	}

	// Open the saved file and read its bytes
	imageData, err := os.ReadFile("uploaded_image.jpg")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read the saved file"})
		return
	}

	text, err := ocr.PerformOCR(imageData)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process image for OCR"})
		return
	}

	// Respond with the extracted text
	c.JSON(http.StatusOK, gin.H{"text": text})
}
