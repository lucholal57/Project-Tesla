package com.Tesla.init.services;

import com.Tesla.init.models.Usuario;
import com.Tesla.init.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscaUsuarioPorUsername(String username){
        return usuarioRepository.findByUsername(username);
    }

}
