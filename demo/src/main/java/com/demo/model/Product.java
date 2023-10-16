package com.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    private int pid;
    private String pname;
    private int brand;
    private int category;
    private String image;
    private String desc;
    private int ram;
    private String rcamera;
    private int battery;
    private double charge;
    private int screen;
    private int fcamera;
    private String resolution;
    private double widescreen;
    private int scanfrequency;
    private int brightness;
    private String glass;
    private String os;
    private int card;
    private String cpu;
    private String gpu;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "price",
            joinColumns = {@JoinColumn(name = "pid", referencedColumnName = "pid")},
            inverseJoinColumns = {@JoinColumn(name = "color", referencedColumnName = "id")}
    )
    @JsonManagedReference
    private Set<Color> colors;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "price",
            joinColumns = {@JoinColumn(name = "pid", referencedColumnName = "pid")},
            inverseJoinColumns = {@JoinColumn(name = "rom", referencedColumnName = "id")}
    )
    @JsonManagedReference
    private Set<Rom> roms;
}
