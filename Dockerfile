# Etapa 1: Construcción
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm install rollup --force
RUN npm run build

# Etapa 2: Servidor de producción
FROM node:20-alpine

WORKDIR /app

# Instala un servidor estático ligero
RUN npm install -g serve

# Copia archivos estáticos generados
COPY --from=builder /app/dist /app/dist

# Exponer el puerto 4173 (puerto por defecto de Vite preview)
EXPOSE 4173

# Comando para servir la app
CMD ["serve", "-s", "dist", "-l", "5173"]
