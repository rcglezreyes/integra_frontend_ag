# Utiliza una imagen de Node.js para construir la aplicación Angular
FROM node:22-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build --omit=dev

# Utiliza una imagen de Nginx para servir la aplicación Angular
FROM nginx:alpine

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los certificados SSL
COPY certs /etc/nginx/certs

# Copia los archivos de la aplicación Angular construida al directorio de Nginx
COPY --from=build /app/dist/users/browser /usr/share/nginx/html

# Expone el puerto 80 y 443
EXPOSE 80 443

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
