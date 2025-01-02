package image

import "os"

func SaveImage(imageBytes []byte) error {
	filePath := "uploaded_image.jpg"
	err := os.WriteFile(filePath, imageBytes, 0644)
	if err != nil {
		return err
	}
	return nil
}
