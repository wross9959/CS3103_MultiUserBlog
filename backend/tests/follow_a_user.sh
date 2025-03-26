#!/bin/bash
read -p "Your User ID: " user_id
read -p "User ID to follow: " follow_id

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/users/$user_id/follows/$follow_id \
     -b cookie-jar