package com.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "product")
public class Product {
    @Id
    private int pid;
    private String pname;
    private String image;
    private int cid;
    private String desc;
    private float price;
    private int brand;
    private int ram;
    private int rom;
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
}
