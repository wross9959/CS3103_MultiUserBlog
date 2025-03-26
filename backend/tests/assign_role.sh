#!/bin/bash
read -r -p "User ID: " user_id
read -r -p "Role ID: " role_id

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/roles/$user_id \
     -H "Content-Type: application/json" \
     -d '{ "role_id": '$role_id' }' \
     -b cookie-jar
