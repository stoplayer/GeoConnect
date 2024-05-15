package com.example.backend.repository;

import com.example.backend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUsername(String username);
    List<Contact> findByContact(String contact);
    Optional<Contact> findByUsernameAndContact(String username, String contact);
}

