package com.Tesla.init.controllers;

import com.Tesla.init.models.Producto;
import com.Tesla.init.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/producto", headers = "Accept=application/json")
public class ProductoRestController {

    @Autowired
    private ProductoService productoService;

    //Crea Producto
    @PostMapping(value = "/crea", consumes = "application/json")
    public ResponseEntity<Producto> creaProducto(@RequestBody Producto producto) {
        // Valida que el producto no sea nula antes de intentar crearla
        if (producto == null) {
            return ResponseEntity.badRequest().build(); // Devuelve un 400 Bad Request si la producto es nula
        }

        // Crea la categoría utilizando el servicio
        Producto nuevaProducto = productoService.creaProducto(producto);

        // Verifica si el producto se creó correctamente
        if (nuevaProducto != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaProducto); // Devuelve un 201 Created con la nueva producto
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Devuelve un 500 Internal Server Error si hay un problema al crear
        }
    }

    //Busca Producto por id
    @GetMapping(value = "/{id}")
    public ResponseEntity<Producto> buscaProductoPorId(@PathVariable Long id) {
        Optional<Producto> Producto = productoService.buscaProductoPorId(id);
        return Producto.map(ResponseEntity::ok) // Devuelve un 200 OK con el producto encontrado
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve un 404 Not Found si no se encuentra el producto
    }

    //Lista todos los Productos
    @GetMapping(value = "/listar")
    public ResponseEntity<List<Producto>> listaProducto() {
        List<Producto> Productos = productoService.listaProducto();
        return (Productos != null && !Productos.isEmpty())
                ? ResponseEntity.ok(Productos) // Devuelve un 200 OK con la lista de producto
                : ResponseEntity.noContent().build(); // Devuelve un 204 No Content si no hay producto
    }

    //Actualizar Producto
    @PutMapping(value = "/actualizar")
    public ResponseEntity<Producto> actualizaProducto(@RequestBody Producto producto) {
        Producto productoActualizado = productoService.actualizaProducto(producto);
        return (productoActualizado != null)
                ? ResponseEntity.ok(productoActualizado) // Devuelve un 200 OK con el producto actualizado
                : ResponseEntity.notFound().build(); // Devuelve un 404 Not Found si no se encuentra el producto
    }

    //Eliminar Producto
    @DeleteMapping(value = "/eliminar/{id}")
    public ResponseEntity<String> eliminaProducto(@PathVariable Long id) {
        boolean isRemoved = productoService.eliminaProducto(id);
        return isRemoved
                ? ResponseEntity.ok("Categoría eliminada con éxito.") // Devuelve un 200 OK si se eliminó el producto
                : ResponseEntity.notFound().build(); // Devuelve un 404 Not Found si no se encuentra el producto

    }

    // Buscar Producto por Código
    @GetMapping(value = "/codigo/{codigo}")
    public ResponseEntity<Producto> buscaProductoPorCodigo(@PathVariable String codigo) {
        Optional<Producto> producto = productoService.buscaProductoPorCodigo(codigo);
        return producto.map(ResponseEntity::ok) // Devuelve un 200 OK con el producto encontrado
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve un 404 Not Found si no se encuentra el producto
    }

}
