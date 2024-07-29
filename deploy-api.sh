#!/bin/bash

# use WSL if on Windows.
# dependency:
# sudo apt-get install sshpass
sshpass -p '###' ssh linuxuser@11.21.11.115 <<-'ENDSSH'
    #commands to run on remote host
    aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 654654433291.dkr.ecr.eu-central-1.amazonaws.com &&
    docker compose pull && docker compose up -d
ENDSSH
