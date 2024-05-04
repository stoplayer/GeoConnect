package com.example.backend.repository;

import com.example.backend.entity.Pays;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaysRepo extends JpaRepository<Pays, String> {
    Optional<Pays> findByNom(String name);
    Optional<Pays> findById(Long id) ;
    Optional<Pays> findByCode(String code) ;






}
