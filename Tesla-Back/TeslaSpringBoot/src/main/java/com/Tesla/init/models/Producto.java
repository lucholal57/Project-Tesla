package com.Tesla.init.models;

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
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "codigo")
    private String codigo;
    @Column(name = "precio")
    private float precio;
    @Column(name = "precioCosto")
    private float precioCosto;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "stock")
    private int stock;
    // Relación Many-to-One con Categoria
    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")  // Define la columna de FK
    private Categoria categoria;
}
