FROM node:12.18

COPY build profile-service/build/
COPY node_modules profile-service/node_modules/

CMD npm run deploy --prefix profile-service/build