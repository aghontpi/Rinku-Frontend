# Personal Cloud

> Create/manage download links for filesystem, shrink-url, analytics for downloaded files.

## Features

- Create download link for any files
- Manage all the download links
- Download page for files is seperate
- Get analytics of the download statistics
- Includes url-shortener

## Built with

- React
- React router
- semnatic ui
- php
    - custom framework which is very basic
- Docker
- nivo

## Folder structure

- server
    - contains server (php files)
- src 
    - contains client (javascript files)
- Docker
    - docker-compose which utilizes 3 docker containers
        - php
        - mysql
        - adminer
- mysql setup files
    - Docker/mysql/dbinit/


## Documentation

Set the path, make sure the path mentioned has appropriate permission.

```php

server/interfaces/config.php
   
    /* tells application the root path to operate on */
    const path = ".";
    const host = "host-name-here";
    const database = "database-name-here";
    const user = "username-here";
    const password = "password-here";

```

create mysql database, import the following file

```bash

Docker/mysql/dbinit/tables.sql

```

### How to run with docker

#### Server

You must have Docker with docker-compose installed.

Navigate to folder "Docker" use the command

```bash

docker-compose up

```
note: 

mysql lib files are mounted under "Docker/.mysql" to maintain persistence.
ignore it in watchers.

For more, use README inside "Docker/" folder.

use cors anywhere if the cors setup on the server is not working for you.

#### Client (does not depend upon docker)

```bash

npm start

```

to get the production build

```bash

npm run build

```

#### default credentials provided with docker setup.

username: testuser
passowrd: 123456
