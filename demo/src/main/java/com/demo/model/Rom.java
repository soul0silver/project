package com.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rom")
public class Rom {
    @Id
    private int id;
    private int size;
    @ManyToMany(fetch = FetchType.EAGER,mappedBy = "roms")
    private Set<Product> products;
}
