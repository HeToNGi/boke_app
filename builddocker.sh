#!/bin/bash

# 开发环境

service_name="boke-app"
service_version="1.0"
NODE_ENV="dev"

docker stop ${service_name}

docker rm ${service_name}

docker rmi ${service_name}:${service_version}

docker build -t ${service_name}:${service_version} .

docker run -i --init -p 4000:3000 -e NODE_ENV=${NODE_ENV} -d -t --cap-add=SYS_ADMIN --name ${service_name} ${service_name}:${service_version}
