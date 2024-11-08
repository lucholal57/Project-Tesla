package com.Tesla.init.repositories;

import com.Tesla.init.models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

   List<Categoria> findByCategoria(String categoria);

}
