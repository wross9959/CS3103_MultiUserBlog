#!/bin/bash
read -p "Comment ID to update: " comment_id
read -p "New comment body: " body

curl -i -X PUT http://cs3103.cs.unb.ca:8023/api/blogs/comments/$comment_id \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{"body": "'$body'"}'