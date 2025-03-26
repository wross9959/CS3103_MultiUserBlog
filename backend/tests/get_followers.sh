#!/bin/bash
read -p "User ID to get follows for: " user_id

curl -i -X GET http://cs3103.cs.unb.ca:8023/api/users/$user_id/follows \
     -b cookie-jar