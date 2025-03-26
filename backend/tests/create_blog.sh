#!/bin/bash
read -r -p "Blog Title: " title
read -r -p "Blog Body: " body
read -r -p "Status (published/draft): " status

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/blogs \
     -H "Content-Type: application/json" \
     -d '{ "title": "'$title'", "body": "'$body'", "status": "'$status'" }' \
     -b cookie-jar
