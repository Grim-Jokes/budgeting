package ocr

import (
	"os"
	"strings"

	"github.com/otiai10/gosseract/v2"
)

// performOCR performs OCR on the image using the Tesseract OCR library (via gosseract)
func PerformOCR(imageBytes []byte) ([]string, error) {
	// Create a temporary file for the image
	tmpFile, err := os.CreateTemp("", "image-*.jpg")
	if err != nil {
		return []string{}, err
	}
	defer tmpFile.Close()

	// Write image bytes to the temp file
	_, err = tmpFile.Write(imageBytes)
	if err != nil {
		return []string{}, err
	}

	// Initialize a new Tesseract client
	client := gosseract.NewClient() // This is correct for gosseract v2
	client.SetVariable("tessedit_char_whitelist", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#:/ ")
	client.SetVariable("user_defined_dpi", "300")

	defer client.Close()

	// Set the image for OCR
	err = client.SetImage(tmpFile.Name())
	if err != nil {
		return []string{}, err
	}

	// Perform OCR and extract text
	text, err := client.Text()
	if err != nil {
		return []string{}, err
	}

	return strings.Split(text, "\n"), nil
}
