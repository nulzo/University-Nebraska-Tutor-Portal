FROM node:lts AS development

WORKDIR /frontend

COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

# npm clean install
RUN npm ci

# Copy stuff over
COPY . /frontend

ENV CI=true 
ENV PORT=4200 

RUN npm run build
