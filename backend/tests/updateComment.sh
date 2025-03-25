curl -i -X PUT http://cs3103.cs.unb.ca:8023/api/blogs/comments/1 \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{"body": "Actually... this blog post is fantastic!"}'
