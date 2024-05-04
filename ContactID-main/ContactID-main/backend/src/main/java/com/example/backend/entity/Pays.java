package com.example.backend.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;


import jakarta.persistence.*;


@Entity
public class Pays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String indicatif;

    private String code;

    @OneToMany(mappedBy = "pays", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OurUsers> users;

    // Constructors, getters, and setters

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getIndicatif() {
        return indicatif;
    }

    public void setIndicatif(String indicatif) {
        this.indicatif = indicatif;
    }

    public List<OurUsers> getUsers() {
        return users;
    }

    public void setUsers(List<OurUsers> users) {
        this.users = users;
    }
}


