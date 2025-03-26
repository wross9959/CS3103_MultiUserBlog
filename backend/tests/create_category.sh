#!/bin/bash
read -r -p "Category Name: " name
read -r -p "Description: " description

curl -i -X POST http://cs3103.cs.unb.ca:8023/api/categories \
     -H "Content-Type: application/json" \
     -d '{ "name": "'$name'", "description": "'$description'" }'
