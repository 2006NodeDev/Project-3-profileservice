FROM node:12.18

COPY build PROJECT-3-PROFILESERVICE/build/
COPY node_modules PROJECT-3-PROFILESERVICE/node_modules/

CMD npm run deploy --prefix PROJECT-3-PROFILESERVICE/build