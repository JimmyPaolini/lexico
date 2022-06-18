#!/bin/bash
if [ $1 == "web" ]; then
  DOCKER_BUILDKIT=1 docker build -f infra/docker/web.Dockerfile -t jimmypaolini/lexico-web .
elif [ $1 == "server" ]; then
  DOCKER_BUILDKIT=1 docker build -f infra/docker/server.Dockerfile -t jimmypaolini/lexico-server .
elif [ $1 == "database" ]; then
  docker image pull postgres:13
else
  echo "invalid input"
  exit 1
fi
exit 0
