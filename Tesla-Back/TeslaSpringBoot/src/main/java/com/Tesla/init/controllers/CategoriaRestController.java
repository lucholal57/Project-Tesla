package com.Tesla.init.controllers;

import com.Tesla.init.models.Categoria;
import com.Tesla.init.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/categoria", headers = "Accept=application/json")
public class CategoriaRestController {

    @Autowired
    private CategoriaService categoriaService;

    //Crea Categoria
    @PostMapping(value = "/crea", consumes = "application/json")
    public ResponseEntity<Categoria> creaCategoria(@RequestBody Categoria categoria) {
        // Valida que la categoría no sea nula antes de intentar crearla
        if (categoria == null) {
            return ResponseEntity.badRequest().build(); // Devuelve un 400 Bad Request si la categoría es nula
        }

        // Crea la categoría utilizando el servicio
        Categoria nuevaCategoria = categoriaService.creaCategoria(categoria);

        // Verifica si la categoría se creó correctamente
        if (nuevaCategoria != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCategoria); // Devuelve un 201 Created con la nueva categoría
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Devuelve un 500 Internal Server Error si hay un problema al crear
        }
    }

    //Busca Categoria por categoria
    @GetMapping(value = "/busca")
    public ResponseEntity<List<Categoria>> buscaPorCategoria(@RequestParam String categoria) {
        List<Categoria> categorias = categoriaService.buscaPorCategoria(categoria);
        return ResponseEntity.ok(categorias);
    }

    //Busca Categoria por id
    @GetMapping(value = "/{id}")
    public ResponseEntity<Categoria> buscaCategoriaPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.buscaCategoriaPorId(id);
        return categoria.map(ResponseEntity::ok) // Devuelve un 200 OK con la categoría encontrada
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve un 404 Not Found si no se encuentra la categoría
    }

    //Lista todas las Categoria
    @GetMapping(value = "/listar")
    public ResponseEntity<List<Categoria>> listaCategoria() {
        List<Categoria> categorias = categoriaService.listaCategoria();
        return (categorias != null && !categorias.isEmpty())
                ? ResponseEntity.ok(categorias) // Devuelve un 200 OK con la lista de categorías
                : ResponseEntity.noContent().build(); // Devuelve un 204 No Content si no hay categorías
    }

    //Actualizar Categoria
    @PutMapping(value = "/actualizar")
    public ResponseEntity<Categoria> actualizaCategoria(@RequestBody Categoria categoria) {
        Categoria categoriaActualizada = categoriaService.actualizaCategoria(categoria);
        return (categoriaActualizada != null)
                ? ResponseEntity.ok(categoriaActualizada) // Devuelve un 200 OK con la categoría actualizada
                : ResponseEntity.notFound().build(); // Devuelve un 404 Not Found si no se encuentra la categoría
    }

    //Eliminar Categoria
    @DeleteMapping(value = "/eliminar/{id}")
    public ResponseEntity<String> eliminaCategoria(@PathVariable Long id) {
        boolean isRemoved = categoriaService.eliminarCategoria(id);
        return isRemoved
                ? ResponseEntity.ok("Categoría eliminada con éxito.") // Devuelve un 200 OK si se eliminó la categoría
                : ResponseEntity.notFound().build(); // Devuelve un 404 Not Found si no se encuentra la categoría

    }


}
