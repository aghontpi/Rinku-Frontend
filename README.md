# Personal Cloud

> Manipulate file system on sever, analytics for downloaded files, create donwload link for server files,

## Built with

* React
* React router
* semnatic ui
* php
    * custom framework which is very basic
* Docker


## File structure

* server
    * contains server 

* src 
    * contains client 

* Docker
    * contains php(server configurations), mysql, adminer.

* mysql setup files
    * Docker/mysql/dbinit/


### How Do I setup the server?

Navigate to folder "Docker" use the command

```bash

docker-compose up

```
note: 

mysql lib files are mounted under "Docker/.mysql" to maintain persistence.
ignore it in watchers.

For more, use README inside "Docker/" folder.

use cors anywhere if the cors setup on the server is not working for you.

### How Do I setup the client? 

```bash

npm run build

```


### password mechanism

encryption used for storing passwords is bcrypt

#### default credentials provided with docker setup.

username: testuser
passowrd: 123456