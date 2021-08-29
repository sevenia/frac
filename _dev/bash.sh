#!/bin/bash

docker run --init -it --rm \
  --network host \
  -v "$(pwd)"/../:/app \
  sevenia.frac:dev \
  bash