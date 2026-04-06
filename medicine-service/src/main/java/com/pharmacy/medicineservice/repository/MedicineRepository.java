package com.pharmacy.medicineservice.repository;

import com.pharmacy.medicineservice.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByCategory(String category);
}