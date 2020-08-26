FROM node:12.18

COPY build Project-3-profileservice/build/

COPY node_modules Project-3-profileservice/node_modules/

CMD npm run deploy --prefix Project-3-profileservice/build