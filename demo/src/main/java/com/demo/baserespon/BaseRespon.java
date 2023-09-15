package com.demo.baserespon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@AllArgsConstructor

public class BaseRespon {
    protected ResponseEntity<?> getResponEntity(Object data) {
        return ResponseEntity.ok(data);
    }

    private MyRespon getRespon(Object data) {
        MyRespon myRespon = new MyRespon();
        myRespon.setStatus(200);
        myRespon.setMessage("ss");
        myRespon.setData(data);
        return myRespon;
    }
}
