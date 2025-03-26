#!/bin/bash
read -p "Category ID to delete: " category_id

curl -i -X DELETE http://cs3103.cs.unb.ca:8023/api/categories/$category_id -b cookie-jar