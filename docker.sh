#!/bin/bash

cd spa
docker build -t dsn .
cd ..
docker build -t da .