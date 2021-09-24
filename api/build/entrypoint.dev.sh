#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z pg ${POSTGRES_PORT}; do
  sleep 0.1
done

echo "PostgreSQL started"

export= npm run migrate up


exec "$@"