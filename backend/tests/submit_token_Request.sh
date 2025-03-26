#!/bin/bash

# When the user gets a email with the token they will verify their account by submitting the token.
read -r -p "Token: " token

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/users/me/verify \
    -H "Content-Type: application/json" \
    -d '{"token": "'"$token"'"}' \
    -c cookie-jar
