package com.demo.service.implement;

import com.demo.baserespon.BaseRespon;
import com.demo.model.Supplier;
import com.demo.repository.SupplierRepo;
import com.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class SupplierServiceImp extends BaseRespon implements SupplierService {
    @Autowired
    private SupplierRepo repo;
    @Override
    public ResponseEntity<?> save(Supplier supplier) {
        if (repo.existsById(supplier.getId()))
            return getResponEntity("Supplier's id is already exits");
        if (repo.existsByName(supplier.getName()))
            return getResponEntity("Supplier's name is already exits");
        else if (repo.existsByPhone(supplier.getPhone()))
            return getResponEntity("Supplier's phone is already exits");
        else if (repo.existsByEmail(supplier.getEmail()))
            return getResponEntity("Supplier's email is already exits");
        else {
            Supplier supplier1=repo.save(supplier);
            if (supplier1!=null) return getResponEntity("Add new supplier success");
        }
        return getResponEntity("Add new supplier fail");
    }

    @Override
    public ResponseEntity<?> update(Supplier supplier) {
        Supplier supplier1=repo.save(supplier);
        if (supplier1!=null) return getResponEntity("update supplier success");
        return getResponEntity("Update supplier fail");
    }

    @Override
    public ResponseEntity<?> delete(String id) {
        Supplier supplier1=null;
        if (repo.existsById(id))
             supplier1=repo.findById(id).get();

        if (supplier1!=null) {
            supplier1.setStatus(false);
            repo.save(supplier1);
            return getResponEntity("Delete supplier success");
        }
        return getResponEntity("Delete supplier fail");

    }

    @Override
    public ResponseEntity<?> getList() {
        return getResponEntity(repo.findAllByStatusIsTrue());
    }
}
