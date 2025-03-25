curl -i -X POST http://cs3103.cs.unb.ca:8023/api/roles/2 \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{ "role_id": 2 }'
