#!/bin/bash

cd /home/ubuntu/my-nest-app

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npm install

aws s3 cp s3://mscwrd02-github-action-s3-bucket/.env /home/ubuntu/my-nest-app/
aws s3 cp s3://mscwrd02-github-action-s3-bucket/spot_category.csv /home/ubuntu/my-nest-app/dist/database/seeds/
aws s3 cp s3://mscwrd02-github-action-s3-bucket/spots.csv /home/ubuntu/my-nest-app/dist/database/seeds/
aws s3 cp s3://mscwrd02-github-action-s3-bucket/spot_images.csv /home/ubuntu/my-nest-app/dist/database/seeds/

npm run start:prod



