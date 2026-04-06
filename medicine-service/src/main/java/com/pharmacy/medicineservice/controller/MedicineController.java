package com.pharmacy.medicineservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmacy.medicineservice.model.Medicine;
import com.pharmacy.medicineservice.service.MedicineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")
    public ResponseEntity<?> addMedicine(@Valid @RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.addMedicine(medicine));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineService.getMedicineById(id);
        if (medicine == null) return ResponseEntity.status(404).body("Medicine not found");
        return ResponseEntity.ok(medicine);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Medicine>> getMedicinesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(medicineService.getMedicinesByCategory(category));
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestParam Integer stock) {
        Medicine medicine = medicineService.updateStock(id, stock);
        if (medicine == null) return ResponseEntity.status(404).body("Medicine not found");
        return ResponseEntity.ok(medicine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok("Medicine deleted successfully");
    }
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {
	    List<String> errors = ex.getBindingResult()
	        .getFieldErrors()
	        .stream()
	        .map(FieldError::getDefaultMessage)
	        .collect(java.util.stream.Collectors.toList());
	    return ResponseEntity.status(400).body(errors);
	}
}