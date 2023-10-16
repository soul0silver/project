package com.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Entity(name = "color")
public class Color {
    @Id
    private int id;
    private String color;
    @ManyToMany(fetch = FetchType.EAGER,mappedBy = "colors",cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Product> products;
}
