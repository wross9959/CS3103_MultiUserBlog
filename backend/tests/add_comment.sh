#!/bin/bash
read -r -p "Blog ID: " blog_id
read -r -p "Comment Body: " body

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/blogs/$blog_id/comments \
     -H "Content-Type: application/json" \
     -d '{ "body": "'$body'" }' \
     -b cookie-jar
