package com.example.backend.entity;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contact_id;

    @Column( length = 50)
    private String username;

    @Column(length = 20)
    private String contact;
}

