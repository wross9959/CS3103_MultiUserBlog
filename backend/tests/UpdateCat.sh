curl -i -X PUT http://cs3103.cs.unb.ca:8023/api/categories/1 \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{ "name": "Tech", "description": "Updated category description" }'
