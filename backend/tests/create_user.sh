#!/bin/bash

# This will create a user 

read -r -p "Username: " username
read -r -p "Email: " email
read -r -p "First Name: " first_name
read -r -p "Last Name: " last_name
read -r -s -p "Password: " password

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/users \
    -H "Content-Type: application/json" \
    -d '{"username": "'"$username"'", "email": "'"$email"'", "first_name": "'"$first_name"'", "last_name": "'"$last_name"'", "password": "'"$password"'"}'
