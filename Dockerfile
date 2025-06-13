# Etapa 1: Construcción
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Servidor de producción
FROM node:20-alpine

WORKDIR /app

# Instala un servidor estático ligero
RUN npm install -g serve

# Copia archivos estáticos generados
COPY --from=builder /app/dist /app/dist

# Exponer el puerto 3000
EXPOSE 3000

# Comando para servir la app
CMD ["serve", "-s", "dist", "-l", "3000"]
