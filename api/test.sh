# Encode the image as Base64 and save the JSON to a file
base64 -w 0 ~/receipt.jpg | jq  -R '{image: .}' > payload.json

# Use the JSON file with curl
curl -X POST -H "Content-Type: application/json" -d @payload.json http://localhost:3000/upload
