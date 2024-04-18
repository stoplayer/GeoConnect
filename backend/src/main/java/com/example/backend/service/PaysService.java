package com.example.backend.service;

import com.example.backend.entity.Pays;
import com.example.backend.repository.PaysRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaysService {

    private final PaysRepo paysRepo;

    @Autowired
    public PaysService(PaysRepo paysRepo) {
        this.paysRepo = paysRepo;
    }

    public Pays addPays(Pays pays) {
        return paysRepo.save(pays);
    }

    public void deletePays(String id) {
        paysRepo.deleteById(id);
    }

    public Pays updatePays(Pays pays) {
        return paysRepo.save(pays);
    }

    public Optional<Pays> findByNom(String nom) {
        return paysRepo.findByNom(nom);
    }

    public List<Pays> getAllPays() {
        return paysRepo.findAll();
    }
}