package com.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pid;
    private String pname;
    private int brand;
    private int category;
    private String image;
    private String description;
    private int ram;
    private String rcamera;
    private int battery;
    private double charge;
    private double screen;
    private int fcamera;
    private String resolution;
    private String screenratio;
    private int scanfrequency;
    private double brightness;
    private String glass;
    private String os;
    private int card;
    private String cpu;
    private String gpu;
    private int status;
    private String supplier;
}
