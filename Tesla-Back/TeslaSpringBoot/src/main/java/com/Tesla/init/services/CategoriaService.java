package com.Tesla.init.services;

import com.Tesla.init.models.Categoria;
import com.Tesla.init.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    //Crea Categoria
    public Categoria creaCategoria(Categoria categoria) {
        categoriaRepository.save(categoria);
        return categoria;
    }

    //Listar todas las Categorias
    public List<Categoria> listaCategoria() {
        return categoriaRepository.findAll();
    }

    //Busca Categoria por ID
    public Optional<Categoria> buscaCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    //Actualizar Categoria
    public Categoria actualizaCategoria(Categoria categoria) {
        categoriaRepository.save(categoria);
        return categoria;
    }

    //Eliminar Categoria
    public boolean eliminarCategoria(Long id) {
        // Verificar si la categoría existe
        if (categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id); // Eliminar la categoría
            return true; // Retorna true si se eliminó correctamente
        }
        return false; // Retorna false si la categoría no existía
    }


    //>>>>>>>> METODOS PROPIOS <<<<<<<<<

    //Busca por Categoria
    public List<Categoria> buscaPorCategoria(String categoria) {
        return categoriaRepository.findByCategoria(categoria);
    }

}
