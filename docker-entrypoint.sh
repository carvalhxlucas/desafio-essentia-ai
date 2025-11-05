#!/bin/sh

set -e

DB_PATH="${DATABASE_PATH:-/app/data/database.sqlite}"

echo "Criando diretório do banco de dados se necessário..."
mkdir -p "$(dirname "$DB_PATH")"

if [ ! -f "$DB_PATH" ]; then
  echo "Banco de dados não encontrado. Executando seed..."
  npm run seed
  echo "Seed concluído com sucesso!"
else
  echo "Banco de dados encontrado. Pulando seed."
fi

echo "Iniciando servidor..."
exec node dist/index.js

