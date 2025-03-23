#!/bin/bash

# Connect from local to fcslinux, jump to cs3103, and show the directory contents
echo "Connecting to s6we4@cs3103.cs.unb.ca via s6we4@fcslinux.cs.unb.ca..."
ssh -t -J s6we4@fcslinux.cs.unb.ca s6we4@cs3103.cs.unb.ca 'cd /var/www/html/s6we4 && ls && bash'
