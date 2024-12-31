FROM oven/bun:alpine

# Create app directory
WORKDIR /app

# Copy files to directory
COPY ./ /app/

# Iniciando bun e executando testes
RUN bun install && bun test

# Descompando arquivos de simulacao
RUN unzip data/simulationInput.zip -d data

# Iniciando CLI
ENTRYPOINT ["sh", "Bench.sh"]
