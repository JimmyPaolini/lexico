#!/bin/bash

# Set environment variables from .env file
export $(grep -v '^#' .env | xargs)
export PGPASSWORD=$POSTGRES_PASSWORD

FOLDER="data/backup"
CONNECTION=\
  --dbname $POSTGRES_DB \
  --username $POSTGRES_USER \
  --host localhost \
  --port 5432 \

if [ $1 == "backup" ]; then

  BACKUP="$FOLDER/$(date -u +%FT%TZ).zip"
  echo "Backup to $BACKUP"
  pg_dump \
    --compress 9 \
    "$CONNECTION" \
    --format c \
    --data-only \
    > $BACKUP

elif [ $1 == "restore" ]; then

  RESTORE="$FOLDER/$(ls -1 "$FOLDER" | sort | tail -1)"
  echo "Restore from $RESTORE"
  pg_restore \
    --dbname $POSTGRES_DB \
    --username $POSTGRES_USER \
    --host localhost \
    --port 5432 \
    --format c \
    --data-only \
    < $RESTORE

else
  exit 1
fi
exit 0