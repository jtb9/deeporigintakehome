#!/bin/bash
docker build -t take-home-justin-barnyak .
docker run -p 3000:3000 take-home-justin-barnyak
