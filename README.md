# OppossumNetworkWeb
> Webserver of the Network (currently contains: Homepage)

---

## Overview

- CSS
- HTML5
- Javascript
- DockerCompose
- Apache2

## Documentations
*commands and code in order of usage*

```bash
mkdir OppossumNetworkWeb
cd OppossumNetworkWeb

mkdir apache2
mkdir websites

docker run --rm httpd:latest cat /usr/local/apache2/conf/httpd.conf > httpd.conf
# creates a temproaly container, takes the apache image(httpd), reads its content and puts it into a new config file in the apache2 folder(the container)

```
# OppossumNetworkWeb
> Webserver of the Network (currently contains: Homepage)

---

## Overview

- CSS
- HTML5
- Javascript
- DockerCompose
- Apache2

## Documentations
*commands and code in order of usage*

```bash
mkdir OppossumNetworkWeb
cd OppossumNetworkWeb

mkdir apache2
mkdir websites

docker run --rm httpd:latest cat /usr/local/apache2/conf/httpd.conf > httpd.conf
# creates a temprorary container, takes the apache image(httpd), reads its content and puts it into a new config file in the apache2 folder(the container)

```
# OppossumNetworkWeb
> Webserver of the Network (currently contains: Homepage)

---

## Overview

* frontend
- CSS
- HTML5
- Javascript
* infrastructure
- DockerCompose
- Apache2

## Documentations
*commands and code in order of usage*

>10/08/2026 
>Setup Webserver

```bash
mkdir OppossumNetworkWeb
cd OppossumNetworkWeb

mkdir apache2
mkdir websites

cd apache2

sudo apt update && sudo apt install -y docker.io docker-compose

systemctl enable --now docker
#enable docker for the following command

docker run --rm httpd:latest cat /usr/local/apache2/conf/httpd.conf > httpd.conf
# creates a temproaly container, takes the apache image(httpd), reads its content and puts it into a new config file in the apache2 folder(the container)

```

Then I created the yml file [/apache2/docker-compose.yml](/apache2/docker-compose.yml)
*the path left from the : is the actual pyth on the file system. The path on the right is the virtual path in the container that apache uses.*

```bash
docker-compose up -d
#-d lets it run in the background so the terminal is free
```

>10/08/2026
>installing update system

```bash
sudo apt update && sudo apt install -y unattended-upgrades

sudo dpkg-reconfigure unattended-upgrades

#tested following command for status
systemctl status unattended-upgrades
#returned active

#testet following command to look how its running
unattended-upgrade --dry-run
#returned nothing so I ran it with debug just for checking
unattended-upgrade --dry-run --debug
#worked perfect
```

>10/08/2026
>updated folder in apache container to make logs visible


added this line to [/apache2/docker-compose.yml](/apache2/docker-compose.yml): 
*- ./logs:/usr/local/apache2/logs/*

shortened the httpd.conf datei [/apache2/httpd.conf](/apache2/httpd.conf) and removed everything unecessary
added this line to have all logs:
*CustomLog logs/access.log combined*

CustomLog: tells Apache to write logs
logs/access.log: direction and filename
combined: use detailed log format

added this to [/apache2/httpd.conf](/apache2/httpd.conf) to manage Domains


```text
LoadModule alias_module modules/mod_alias.so
[
...
]
<VirtualHost *:80>
    ServerName threeoppossums.com
    ServerAlias www.threeoppossums.com

    DocumentRoot "/usr/local/apache2/htdocs"
    
    <Directory "/usr/local/apache2/htdocs">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    ErrorLog logs/error.log
    CustomLog logs/access.log combined
</VirtualHost>
```
Options Indexes(1) FollowSymLinks(2): (1)allows Apache to show content as list if no index (2)allows Apache to follow links

Require all granted: allows public acces

```bash
cd OppossumNetworkWeb
cd apache2

docker-compose restart
#restarts service to apply changes
```
## update: acces to www.threeoppossums.com somehow not possible