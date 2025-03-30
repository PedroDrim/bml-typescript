# Etapa de Build
FROM alpine:3.14 AS build

# Instala dependências necessárias para extração dos arquivos
RUN apk add --no-cache unzip

# Define diretório de trabalho
WORKDIR /build

# Copia os arquivos de dados para a etapa de build
COPY ./data /build/

# Descompacta os arquivos de simulação
RUN unzip simulationInput_D.zip -d .

FROM oven/bun:alpine

# Create app directory
WORKDIR /app

# Copy files to directory
COPY ./ /app/

# Iniciando bun e executando testes
RUN bun install && bun test

# Copia os arquivos extraídos da etapa de build
COPY --from=build /build /app/data

# Iniciando CLI
ENTRYPOINT ["sh", "Bench.sh"]
