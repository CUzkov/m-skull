#!/bin/bash

cd spa
docker build -t dsn .
cd ../django-apps
docker build -t da .

cd ..

docker-compose up -d
