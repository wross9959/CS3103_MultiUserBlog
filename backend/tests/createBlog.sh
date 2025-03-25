curl -i -X POST http://cs3103.cs.unb.ca:8023/api/blogs \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{"title": "Test Blog", "body": "This is a test blog.", "status": "published"}'
