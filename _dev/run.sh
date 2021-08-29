#!/bin/bash

docker run --init -it --rm \
  --network host \
  -v "$(pwd)"/../:/app \
  sevenia.frac:dev \
  bash -c "cd /app && yarn dev"

docker run --init -it --rm \
  --network host \
  -v "$(pwd)"/../:/app \
  sevenia.frac:dev \
  bash -c "cd /app && prettier --config .prettierrc.js -w ."

docker run --init -it --rm \
  --network host \
  -v "$(pwd)"/../:/app \
  sevenia.frac:dev \
  bash -c "cd /app && yarn build"

