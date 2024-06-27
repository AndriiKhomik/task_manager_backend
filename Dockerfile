FROM node:lts

RUN npm istall -g nodemon

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
COPY . /code

EXPOSE 8000

CMD [ "npm", "run", "dev" ]