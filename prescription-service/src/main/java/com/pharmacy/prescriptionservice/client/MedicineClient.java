package com.pharmacy.prescriptionservice.client;

import com.pharmacy.prescriptionservice.dto.MedicineDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "medicine-service")
public interface MedicineClient {

    @GetMapping("/api/medicines/{id}")
    MedicineDTO getMedicineById(@PathVariable Long id);

    @PutMapping("/api/medicines/stock/{id}")
    MedicineDTO updateStock(@PathVariable Long id, @RequestParam Integer stock);
}