#!/bin/bash

# This will login a user 

read -r -p "Email: " email
read -r -s -p "Password: " password

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/signin \
    -H "Content-Type: application/json" \
    -d '{"email": "'"$email"'", "password": "'"$password"'"}' \
    -c cookie-jar
