package com.example.backend.service;

import com.example.backend.entity.Contact;
import com.example.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findContactsByUsername(String username) {
        return contactRepository.findByUsername(username);
    }

    public List<Contact> findContactsByContact(String contact) {
        return contactRepository.findByContact(contact);
    }
    public Contact addContact(Contact contact) {
        // Check if the contact already exists
        Optional<Contact> existingContact = contactRepository.findByUsernameAndContact(contact.getUsername(), contact.getContact());
        if (existingContact.isPresent()) {
            // If contact already exists, return it without saving
            return existingContact.get();


        } else {
            // If contact does not exist, save it
            return contactRepository.save(contact);
        }
    }
}
