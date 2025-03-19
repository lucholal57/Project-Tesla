# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias sin guardar paquetes innecesarios
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente del proyecto
COPY . .

# Compilar la aplicación para producción
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Eliminar archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar la aplicación Angular generada en la etapa de build
COPY --from=build /app/dist/tesla-client-new /usr/share/nginx/html

# 🔴 Corrección: Copiar `nginx.conf` en `/etc/nginx/conf.d/default.conf` (NO en `/etc/nginx/nginx.conf`)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que corre Nginx
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
