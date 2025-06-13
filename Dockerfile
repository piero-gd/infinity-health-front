# Fase 1: Construcción
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

# Instalar dependencias
RUN npm install

# Construir el proyecto
RUN npm run build

# Fase 2: Servidor de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar vite de forma global para servir la app
RUN npm install -g vite

# Copiar el directorio dist generado
COPY --from=builder /app/dist /app/dist

# Puerto por defecto de vite preview
EXPOSE 4173

# Comando para servir la aplicación en producción
CMD ["vite", "preview", "--port", "4173", "--host"]
