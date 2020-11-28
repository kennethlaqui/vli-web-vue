# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# FROM node:lts-alpine

# https://github.com/webplug-lab/vue-dockerize.git

# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'app' folder the current working directory
# WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# install project dependencies
# RUN npm install

# install vue-cli
# RUN npm install -g @vue/cli

# copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# build app for production with minification
#RUN npm run build

#EXPOSE 80
#CMD [ "http-server", "dist" ]
# CMD [ "npm", "run", "serve" ]