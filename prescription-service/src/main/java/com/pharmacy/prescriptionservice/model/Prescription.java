package com.pharmacy.prescriptionservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Patient ID is required")
    @Column(nullable = false)
    private Long patientId;

    @NotNull(message = "Medicine ID is required")
    @Column(nullable = false)
    private Long medicineId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    @NotBlank(message = "Doctor name is required")
    @Column(nullable = false)
    private String doctorName;

    @NotBlank(message = "Notes are required")
    @Column(nullable = false)
    private String notes;

    @Column(nullable = false)
    private LocalDateTime prescriptionDate;

    @Column(nullable = false)
    private String status;
}