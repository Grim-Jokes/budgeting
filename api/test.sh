( set -x 

# Use the JSON file with curl

curl -X POST -F "image=@/vagrant/receipts/receipt.jpeg" http://localhost:3000/upload

set +x
)
