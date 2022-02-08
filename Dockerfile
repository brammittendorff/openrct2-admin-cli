FROM node:17-alpine

RUN apk --update add shadow

RUN groupadd -r openrct2 && useradd --no-log-init -r -g openrct2 openrct2

USER openrct2

WORKDIR /home/openrct2

COPY package*.json /home/openrct2/

RUN npm install

COPY . .

CMD [ "node", "cli.js" ]
