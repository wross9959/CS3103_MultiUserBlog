curl -i -X POST http://cs3103.cs.unb.ca:8023/api/roles \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{ "role": "editor" }'
