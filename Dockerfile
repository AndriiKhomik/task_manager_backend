FROM node:16.20.1-alpine

WORKDIR /code

# ENV CI=true
# ENV PORT=8000

COPY package.json /code/package.json

COPY package-lock.json /code/package-lock.json

COPY tsconfig.json /code/tsconfig.json
# Fix npm error
RUN npm install -g npm@8.1.3

COPY . /code

RUN npm ci

RUN npm run build

# EXPOSE 8000

CMD [ "node", "dist/server.js" ]