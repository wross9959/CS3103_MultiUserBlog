#!/bin/bash

# This will verify the user

curl -i -X GET http://cs3103.cs.unb.ca:8023/api/users/me/verify -b cookie-jar