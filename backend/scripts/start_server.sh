#!/bin/bash

cd /home/ubuntu/my-nest-app

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npm install


npm run start:prod



