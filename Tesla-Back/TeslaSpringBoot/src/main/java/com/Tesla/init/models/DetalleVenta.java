package com.Tesla.init.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "detalle_venta")
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "subtotal")
    private float subtotal;

    // Relación Many-to-One con Venta
    @ManyToOne
    @JoinColumn(name = "venta_id", referencedColumnName = "id")
    @JsonIgnore // Evita que se serialice la venta dentro de los detalles
    private Venta venta;

    // Relación Many-to-One con Producto
    @ManyToOne
    @JoinColumn(name = "producto_id", referencedColumnName = "id")
    private Producto producto;

    // Campo adicional para recibir el productoId desde el frontend
    @Transient
    private Long productoId;
}