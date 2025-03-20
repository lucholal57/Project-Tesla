package com.Tesla.init.controllers;

import com.Tesla.init.models.Usuario;
import com.Tesla.init.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/usuario", headers = "Accept=application/json")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class UsuarioRestController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario usuarioEncontrado = usuarioService.buscaUsuarioPorUsername(usuario.getUsername());

        if (usuarioEncontrado != null && usuarioEncontrado.getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.ok(usuarioEncontrado); // Devuelve el usuario si las credenciales coinciden
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos"); // 401 Unauthorized si no coinciden
        }
    }



}
