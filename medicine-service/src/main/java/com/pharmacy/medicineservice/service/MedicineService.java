package com.pharmacy.medicineservice.service;

import com.pharmacy.medicineservice.model.Medicine;
import com.pharmacy.medicineservice.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    public List<Medicine> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category);
    }

    public Medicine updateStock(Long id, Integer newStock) {
        Medicine medicine = medicineRepository.findById(id).orElse(null);
        if (medicine == null) return null;
        medicine.setStock(newStock);
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}