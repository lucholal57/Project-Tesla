package com.Tesla.init.services;

import com.Tesla.init.models.Producto;
import com.Tesla.init.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    //Crea Producto
    public Producto creaProducto(Producto producto) {
        productoRepository.save(producto);
        return producto;
    }

    //Listar todos los productos
    public List<Producto> listaProducto() {
        return productoRepository.findAll();
    }

    //Busca Producto por ID
    public Optional<Producto> buscaProductoPorId(Long id){
        return productoRepository.findById(id);
    }

    //Actualiza Producto
    public Producto actualizaProducto(Producto producto){
        productoRepository.save(producto);
        return producto;
    }

    //Elimina Producto
    public Boolean eliminaProducto(Long id){
        // Verificar si la categoría existe
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id); // Eliminar la categoría
            return true; // Retorna true si se eliminó correctamente
        }
        return false; // Retorna false si la categoría no existía
    }

    // Método para buscar producto por código de barras
    public Optional<Producto> buscaProductoPorCodigo(String codigo) {
        return productoRepository.findByCodigo(codigo); // Esto debe ser implementado en el repositorio
    }
}
