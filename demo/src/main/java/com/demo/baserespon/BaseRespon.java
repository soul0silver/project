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
    private MyRespon getRespon(Object data,int status,String ms) {
        MyRespon myRespon = new MyRespon();
        myRespon.setStatus(status);
        myRespon.setMessage(ms);
        myRespon.setData(data);
        return myRespon;
    }
}
