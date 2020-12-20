FROM node:15 as build-stage

WORKDIR /app

ADD ./out /app/out
ADD ./src /app/src
ADD custom.d.ts /app
ADD package.json /app
ADD package-lock.json /app
ADD tsconfig.json /app
ADD webpack.config.js /app
ADD env.ts /app

RUN npm i
RUN npm run compile

FROM nginx:1.19.6

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
