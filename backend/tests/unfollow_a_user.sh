#!/bin/bash
read -p "Your User ID: " user_id
read -p "User ID to unfollow: " follow_id

curl -i -X DELETE http://cs3103.cs.unb.ca:8023/api/users/$user_id/follows/$follow_id \
     -b cookie-jar