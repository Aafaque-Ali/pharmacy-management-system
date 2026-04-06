package com.pharmacy.prescriptionservice.dto;

import lombok.Data;

@Data
public class MedicineDTO {
    private Long id;
    private String name;
    private String manufacturer;
    private Double price;
    private Integer stock;
    private String category;
    private String description;
}