package com.Tesla.init.repositories;

import com.Tesla.init.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {
    // Método para buscar por código de barras
    Optional<Producto> findByCodigo(String codigo);
}
