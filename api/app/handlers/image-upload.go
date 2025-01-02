package handlers

import (
	"api/infra/ocr"
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ImageRequest struct {
	Image string `json:"image"` // Base64-encoded image
}

func HandleImageUpload(c *gin.Context) {

	var req ImageRequest

	// Bind JSON input to struct
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Decode Base64 image data
	imageData, err := base64.StdEncoding.DecodeString(req.Image)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Base64 image data"})
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
