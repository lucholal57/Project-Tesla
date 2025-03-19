package com.Tesla.init;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.util.Objects;

@SpringBootApplication
public class TeslaSpringBootApplication {


	public static void main(String[] args) {
		// Iniciar la aplicación y obtener el entorno
		Environment env = SpringApplication.run(TeslaSpringBootApplication.class, args).getEnvironment();

		// Imprimir el puerto en los logs
		System.out.println("🚀 Backend corriendo en el puerto: " + Objects.requireNonNull(env.getProperty("server.port")));
	}


}
