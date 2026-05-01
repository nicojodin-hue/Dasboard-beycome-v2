# Use the official PHP image.
# https://hub.docker.com/_/php
FROM php:8.2-apache

RUN echo "expose_php = Off" > /usr/local/etc/php/conf.d/expose_php.ini
RUN echo "\
ServerSignature Off\n\
ServerTokens Prod\n\
Header unset X-Powered-By\n\
Header always set Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\"\n\
Header always set X-Frame-Options SAMEORIGIN\n\
Header always set X-Content-Type-Options nosniff\n\
Header always set Referrer-Policy no-referrer-when-downgrade\n\
" >> /etc/apache2/conf-available/security.conf \
    && a2enconf security

# Set a global ServerName to suppress Apache startup warning
RUN echo "ServerName beycome" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

# Enable Apache modules
RUN a2enmod headers rewrite

# Allow .htaccess overrides for rewrite rules
RUN echo "<Directory /var/www/html>\n\
    AllowOverride All\n\
</Directory>" > /etc/apache2/conf-available/allowoverride.conf \
    && a2enconf allowoverride

WORKDIR /var/www/html

COPY ./public /var/www/html

EXPOSE ${PORT}
