package com.Tesla.init.controllers;

import com.Tesla.init.models.Venta;
import com.Tesla.init.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/venta", headers = "Accept=application/json")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class VentaRestController {

    @Autowired
    private VentaService ventaService;

    // Crear una venta
    @PostMapping(value = "/crea", consumes = "application/json")
    public ResponseEntity<Venta> crearVenta(@RequestBody Venta venta) {
        try {
            Venta nuevaVenta = ventaService.crearVenta(venta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Listar todas las ventas
    @GetMapping(value = "/listar")
    public ResponseEntity<List<Venta>> listarVentas() {
        List<Venta> ventas = ventaService.listarVentas();
        return (ventas != null && !ventas.isEmpty())
                ? ResponseEntity.ok(ventas)
                : ResponseEntity.noContent().build();
    }

    // Buscar venta por ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Venta> buscarVentaPorId(@PathVariable Long id) {
        Optional<Venta> venta = ventaService.buscarVentaPorId(id);
        return venta.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar una venta
    @DeleteMapping(value = "/eliminar/{id}")
    public ResponseEntity<String> eliminarVenta(@PathVariable Long id) {
        boolean eliminada = ventaService.eliminarVenta(id);
        return eliminada
                ? ResponseEntity.ok("Venta eliminada con éxito.")
                : ResponseEntity.notFound().build();
    }
}
