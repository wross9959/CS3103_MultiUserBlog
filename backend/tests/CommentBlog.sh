curl -i -X POST http://cs3103.cs.unb.ca:8023/api/blogs/1/comments \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{"body": "Nice write-up!"}'
