package com.example.backend.controller;

import com.example.backend.entity.Pays;
import com.example.backend.service.PaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*@RestController
@RequestMapping("/api/pays")
public class PaysController {

    private final PaysService paysService;

    @Autowired
    public PaysController(PaysService paysService) {
        this.paysService = paysService;
    }

    @PostMapping
    public ResponseEntity<Pays> addPays(@RequestBody Pays pays) {
        Pays newPays = paysService.addPays(pays);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPays);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePays(@PathVariable("id") String id) {
        paysService.deletePays(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pays> updatePays(@PathVariable("id") Long id, @RequestBody Pays pays) {
        pays.setNom(id.toString()); // Ensure the pays ID matches the path variable
        Pays updatedPays = paysService.updatePays(pays);
        return ResponseEntity.ok(updatedPays);
    }

    @GetMapping("/{nom}")
    public ResponseEntity<Pays> getPaysByName(@PathVariable("nom") String nom) {
        Optional<Pays> pays = paysService.findByNom(nom);
        return pays.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Pays>> getAllPays() {
        List<Pays> allPays = paysService.getAllPays();
        return ResponseEntity.ok(allPays);
    }
}*/