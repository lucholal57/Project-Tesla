# Usa una imagen base de Amazon Corretto 11 con Alpine
FROM amazoncorretto:11-alpine-jdk

# Instalación de utilidades para debug
RUN apk update && apk add --no-cache curl postgresql-client

# Copia el archivo JAR generado
COPY target/TeslaSpringBoot-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto 8081
EXPOSE 8081

# Agregar un HEALTHCHECK para ver si la aplicación está viva
HEALTHCHECK --interval=30s --timeout=10s CMD curl -f http://localhost:8081/actuator/health || exit 1

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar", "--server.port=8081"]
