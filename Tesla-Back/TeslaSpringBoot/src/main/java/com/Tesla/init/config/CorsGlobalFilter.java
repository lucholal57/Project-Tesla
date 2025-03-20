package com.Tesla.init.config;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class CorsGlobalFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Permitir cualquier origen (para pruebas)
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Permitir métodos HTTP comunes
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        // Permitir todos los encabezados comunes y personalizados
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, Accept, Origin");

        // Exponer encabezados específicos
        response.setHeader("Access-Control-Expose-Headers", "Authorization, Content-Disposition");

        // Permitir el uso de credenciales (cookies, cabeceras de autenticación)
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // Tiempo máximo para preflight
        response.setHeader("Access-Control-Max-Age", "3600");

        // Si el método es OPTIONS, devolver estado OK sin continuar el filtro
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
