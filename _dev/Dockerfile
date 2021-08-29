FROM node:latest

RUN yarn global add svgo
RUN yarn global add prettier

ENV NODE_PATH=/usr/local/share/.config/yarn/global/node_modules

WORKDIR /app

USER node
