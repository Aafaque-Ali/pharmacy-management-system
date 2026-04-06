package com.pharmacy.prescriptionservice.dto;

import lombok.Data;

@Data
public class PatientDTO {
    private Long id;
    private String name;
    private Integer age;
    private String gender;
    private String phone;
    private String address;
}