package com.demo.model.DTO;

import com.demo.model.Receipt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GRNdetails {
    private Integer id;
    private String receiptid;
    private String pname;
    private double priceim;
    private int quantity;
}
