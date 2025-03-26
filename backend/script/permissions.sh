#!/bin/bash

# im too lazy to do this did it once it becomes a pain when moving files from server to local, enjoy :)

echo "Updating Permissions for Python Route Files"
echo ""
chmod +x ../routes/*.py
echo "All python routes are now executable!"
echo "----------------------------------------"

echo "Updating permissions for all main python files"
echo ""
chmod +x ../*.py
echo "All python main files are now executable!"
echo "----------------------------------------"

echo "Updating permissions for all test files"
echo ""
chmod +x ../tests/*.sh
echo "All bash test scripts are now executable!"
echo "----------------------------------------"


echo "All permissions set!"
echo ""
