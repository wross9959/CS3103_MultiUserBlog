curl -i -X POST http://cs3103.cs.unb.ca:8023/api/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "will.ross@unb.ca", "password": "flask"}' \
  -c cookie-jar
