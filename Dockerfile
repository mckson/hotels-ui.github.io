FROM node:16.9.1

RUN npm install -g serve

COPY package.json package.json
RUN npm install --force

COPY . .
RUN npm run build

CMD serve -p $PORT -s dist