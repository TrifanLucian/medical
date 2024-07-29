@echo off
echo Running build command for api...
docker build  -t api .
docker tag api:latest 654654433291.dkr.ecr.eu-central-1.amazonaws.com/click4transfer-api:latest
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 654654433291.dkr.ecr.eu-central-1.amazonaws.com
docker push 654654433291.dkr.ecr.eu-central-1.amazonaws.com/click4transfer-api:latest
