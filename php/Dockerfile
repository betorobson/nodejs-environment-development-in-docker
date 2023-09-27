
# https://github.com/oracle/docker-images/blob/main/OracleLinuxDevelopers/oraclelinux7/php/7.4-apache/Dockerfile

FROM oraclelinux:7-slim

RUN yum -y install oracle-php-release-el7 oracle-release-el7 && \
    yum -y install httpd \
                   oracle-instantclient19.5-basic \
                   php \
                   php-cli \
                   php-json \
                   php-mbstring \
                   php-mysqlnd \
                   php-pdo \
                   php-xml \
                   php-oci8-19c \
                   unzip && \
    rm -rf /var/cache/yum/* && \
    # Redirect logging for container usage
    sed -i 's/;error_log = syslog/error_log = \/dev\/stderr/' /etc/php.ini && \
    ln -sf /dev/stdout /var/log/httpd/access_log && \
    ln -sf /dev/stderr /var/log/httpd/error_log && \
    # Remove userdir and welcome module configuration
    rm -f /etc/httpd/conf.d/{userdir.conf,welcome.conf}

COPY src/ /var/www/html/

CMD ["/sbin/httpd", "-DFOREGROUND"]

