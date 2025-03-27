#!/bin/bash
read -p "Comment ID to delete: " comment_id

curl -i -X DELETE http://cs3103.cs.unb.ca:8023/api/blogs/comments/$comment_id -b cookie-jar