#!/bin/bash
read -p "Category ID to update: " category_id
read -p "New category name: " name
read -p "New category description: " desc

curl -i -X PUT http://cs3103.cs.unb.ca:8023/api/categories/$category_id \
     -H "Content-Type: application/json" \
     -b cookie-jar \
     -d '{ "name": "'$name'", "description": "'$desc'" }'