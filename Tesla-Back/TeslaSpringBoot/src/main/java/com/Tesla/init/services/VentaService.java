package com.Tesla.init.services;

import com.Tesla.init.models.DetalleVenta;
import com.Tesla.init.models.Producto;
import com.Tesla.init.models.Venta;
import com.Tesla.init.repositories.ProductoRepository;
import com.Tesla.init.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // Crea una nueva venta
    public Venta crearVenta(Venta venta) {
        // Validar stock y calcular subtotal en los detalles
        for (DetalleVenta detalle : venta.getDetalles()) {
            // Obtener el Producto por su ID
            Producto producto = productoRepository.findById(detalle.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Validar si hay suficiente stock
            if (producto.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            // Actualizar stock del producto
            producto.setStock(producto.getStock() - detalle.getCantidad());
            productoRepository.save(producto);

            // Asignar el producto al detalle
            detalle.setProducto(producto);

            // Calcular subtotal
            detalle.setSubtotal(detalle.getCantidad() * producto.getPrecio());
            detalle.setVenta(venta);
        }

        // Calcular total de la venta
        float total = (float) venta.getDetalles().stream()
                .mapToDouble(DetalleVenta::getSubtotal)
                .sum();
        venta.setTotal(total);

        // Guardar la venta
        return ventaRepository.save(venta);
    }

    // Listar todas las ventas
    public List<Venta> listarVentas() {
        return ventaRepository.findAll();
    }

    // Buscar venta por ID
    public Optional<Venta> buscarVentaPorId(Long id) {
        return ventaRepository.findById(id);
    }

    // Eliminar venta
    public Boolean eliminarVenta(Long id) {
        if (ventaRepository.existsById(id)) {
            ventaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}