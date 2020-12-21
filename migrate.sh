#!/bin/bash

docker-compose exec api python3 ./friends/manage.py migrate
docker-compose exec api python3 ./users/manage.py migrate
docker-compose exec api python3 ./moments/manage.py migrate
