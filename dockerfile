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