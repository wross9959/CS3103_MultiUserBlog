#!/bin/bash
read -r -p "Action: " action

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/activities \
     -H "Content-Type: application/json" \
     -d '{ "action": "'$action'" }' \
     -b cookie-jar
