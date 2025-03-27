#!/bin/bash
read -r -p "Blog ID: " blog_id

curl -i -X GET http://cs3103.cs.unb.ca:8023/api/blogs/$blog_id/comments \
     -b cookie-jar