# zc_web
>@Nickname4th

Using docker-compose to manage node and mongo environments. The containers are based on node and mongo, so make sure that you have already pull the images.
## Instructions
To build dockercompose:
```shell
$ docker-compose up --build -d
```
To enter zc_web:
```shell
$ docker attach zc-web
```
Check if mongo service available:
```shell
$ curl 127.0.0.1:27018
# cause that mongo container 27017 port is reflect to host 27018 port
```
## Node's Dockerfile
```dockerfile
FROM node
RUN npm install express@next cors mongoose
VOLUME ["/zc"]
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
RUN echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list \
echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list \
echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list \
echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y vim
CMD ["/bin/bash"]
```
If you just like to edit the files outside the container, you can simply ignore the instructions which is used to change the apt source and install vim.
## Docker-compose
```yml
version: '3'
services:
  web:
    build:
      context: ./
      dockerfile: dockerfile
    ports:
    - "3334:3333"
    volumes:
    - /home/ubuntu:/zc
    depends_on: 
    - mongo
    container_name: zc-web
    networks:
    - zcnode
    links:
    - mongo
    restart: always
    stdin_open: true
    tty: true
  mongo:
    image: mongo
    ports:
    - "27018:27017"
    volumes:
    - /data/db:/data/db
    networks:
    - zcnode
    container_name: zc-db
networks:
   zcnode:
    driver: bridge
```
Since we need to contact the mongo database from node container, you shoukd created a network group like `zcnode` and make it works on bridge mode. Once you put the networks options in each container, they can easily exchange data by their nicknames.
If you want learn more about docker compose, move to https://blog.51cto.com/9291927/2310444.