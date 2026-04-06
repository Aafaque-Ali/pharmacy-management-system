package com.pharmacy.prescriptionservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharmacy.prescriptionservice.client.MedicineClient;
import com.pharmacy.prescriptionservice.client.PatientClient;
import com.pharmacy.prescriptionservice.dto.MedicineDTO;
import com.pharmacy.prescriptionservice.dto.PatientDTO;
import com.pharmacy.prescriptionservice.model.Prescription;
import com.pharmacy.prescriptionservice.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private PatientClient patientClient;

    @Autowired
    private MedicineClient medicineClient;

    public Prescription createPrescription(Prescription prescription) {
        // Verify patient exists
        PatientDTO patient = patientClient.getPatientById(prescription.getPatientId());
        if (patient == null) throw new RuntimeException("Patient not found");

        // Verify medicine exists and has enough stock
        MedicineDTO medicine = medicineClient.getMedicineById(prescription.getMedicineId());
        if (medicine == null) throw new RuntimeException("Medicine not found");
        if (medicine.getStock() < prescription.getQuantity()) {
            throw new RuntimeException("Insufficient stock. Available: " + medicine.getStock());
        }

        // Reduce medicine stock
        int newStock = medicine.getStock() - prescription.getQuantity();
        medicineClient.updateStock(prescription.getMedicineId(), newStock);

        // Save prescription
        prescription.setPrescriptionDate(LocalDateTime.now());
        prescription.setStatus("ACTIVE");
        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id).orElse(null);
    }

    public List<Prescription> getPrescriptionsByPatient(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }
}