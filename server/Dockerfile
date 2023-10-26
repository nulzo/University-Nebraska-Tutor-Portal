FROM nginx

ARG SERVER_NAME
ARG CERT_COUNTRY
ARG CERT_STATE
ARG CERT_LOC
ARG CERT_ORG
ARG CERT_ORGUNIT

# TODO: Currently generating a self-signed SSL certificate, this needs to be commented out in production builds!
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/$SERVER_NAME.key -out /etc/nginx/$SERVER_NAME.crt -subj "/C=$CERT_COUNTRY/ST=$CERT_STATE/L=$CERT_LOC/O=$CERT_ORG/OU=$CERT_ORGUNIT/CN=$SERVER_NAME"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /nginx.conf.template

# Set the server name in the environment to be used by envsubst
ENV SERVER_NAME=${SERVER_NAME}

# Nginx config does not support env vars by default, use envsubst to replace template vars with their actual values
RUN envsubst '\$SERVER_NAME' < /nginx.conf.template > /etc/nginx/conf.d/nginx.conf