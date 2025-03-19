# Usa una imagen base de Maven y OpenJDK
#FROM maven:3.9.6-openjdk-11 AS build

FROM amazoncorretto:11-alpine-jdk

# Copia los archivos del proyecto
COPY target/TeslaSpringBoot-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 80

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar"]
