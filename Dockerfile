# Common build stage
FROM node:19.3-alpine3.16 as common-build-stage

COPY . ./app

WORKDIR /app

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

RUN npm install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

# CMD ["npm", "run", "dev"]
CMD ["doppler", "run", "--config=dev","--" , "npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["doppler", "run", "--config=prod","--" , "npm", "run", "start"]
