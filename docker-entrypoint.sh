#!/bin/sh

set -e

if [ ! -f /app/database.sqlite ]; then
  echo "Banco de dados não encontrado. Executando seed..."
  npm run seed
  echo "Seed concluído com sucesso!"
fi

echo "Iniciando servidor..."
exec node dist/index.js

