#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
for db in $(echo $POSTGRES_DBS | tr ',' ' '); do
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE DATABASE  $db;
		COMMIT;
	EOSQL
done

echo "Multiple databases created"