curl -i -X POST http://cs3103.cs.unb.ca:8023/api/categories \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{ "name": "Technology", "description": "All things tech." }'
