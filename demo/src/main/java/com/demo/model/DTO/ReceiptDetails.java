package com.demo.model.DTO;

import com.demo.model.Receipt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "receipt_details")
public class ReceiptDetails {
    @Id
    private int id;
    private int stock_id;
    private int quantity;
    private double price;
    private String unit;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "receipt_id",referencedColumnName = "id")
    private Receipt receipt;
}
