FROM node:12.18

COPY build project-3-profileservice/build/
COPY node_modules project-3-profileservice/node_modules/

CMD npm run deploy --prefix project-3-projectservice/build