package com.demo.model.DTO;

import com.demo.model.Receipt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GRNform {
    private Receipt receipt;
    private List<StockDTO> list;
    private int[] quan;
}
