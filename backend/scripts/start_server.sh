#!/bin/sh

cd /home/ubuntu/my-nest-app

npm install

aws s3 cp s3://mscwrd02-github-action-s3-bucket/.env /home/ubuntu/my-nest-app/

npm run start:prod



