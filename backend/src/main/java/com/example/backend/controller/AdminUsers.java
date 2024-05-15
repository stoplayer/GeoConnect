package com.example.backend.controller;
import org.springframework.security.access.annotation.Secured;
import com.example.backend.dto.ReqRes;
import com.example.backend.entity.Product;
import com.example.backend.entity.Pays;
import com.example.backend.service.PaysService;
import com.example.backend.entity.Contact;
import com.example.backend.service.ContactService;
import com.example.backend.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminUsers {

    @Autowired
    private ProductRepo productRepo;
    private final PaysService paysService;
    private final ContactService contactService;

    @Autowired
    public AdminUsers(PaysService paysService, ContactService contactService) {
        this.paysService = paysService;
        this.contactService = contactService;
    }
    @GetMapping("/public/product")
    public ResponseEntity<Object> getAllProducts(){
        return ResponseEntity.ok(productRepo.findAll());
    }

    @PostMapping("/admin/saveproduct")
    public ResponseEntity<Object> signUp(@RequestBody ReqRes productRequest){
        Product productToSave = new Product();
        productToSave.setName(productRequest.getName());
        return ResponseEntity.ok(productRepo.save(productToSave));
    }


    @GetMapping("/user/alone")
    public ResponseEntity<Object> userAlone(){
        return ResponseEntity.ok("USers alone can access this ApI only");
    }

    @GetMapping("/adminuser/both")
    public ResponseEntity<Object> bothAdminaAndUsersApi(){
        return ResponseEntity.ok("Both Admin and Users Can  access the api");
    }

    /** You can use this to get the details(name,email,role,ip, e.t.c) of user accessing the service*/
    @GetMapping("/public/email")
    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication); //get all details(name,email,password,roles e.t.c) of the user
        System.out.println(authentication.getDetails()); // get remote ip
        System.out.println(authentication.getName()); //returns the email because the email is the unique identifier
        return authentication.getName(); // returns the email
    }

    //Pays section
    @PostMapping("/admin/addpays")

    public ResponseEntity<Pays> addPays(@RequestBody Pays pays) {
        Pays newPays = paysService.addPays(pays);
        return ResponseEntity.ok(newPays);
    }

    /*@PutMapping("/public/{id}")
    public ResponseEntity<Pays> updatePays(@PathVariable("id") Long id, @RequestBody Pays pays) {
        pays.setNom(id.toString()); // Ensure the pays ID matches the path variable
        Pays updatedPays = paysService.updatePays(pays);
        return ResponseEntity.ok(updatedPays);
    }*/

    @GetMapping("/user/pays/{id}")
    public ResponseEntity<Pays> getPaysById(@PathVariable("id") Long id) {
        Optional<Pays> pays = paysService.findById(id);
        return pays.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/admin/pays")
    public ResponseEntity<List<Pays>> getAllPays() {
        List<Pays> paysList = paysService.getAllPays();
        return ResponseEntity.ok(paysList);
    }



   /* @GetMapping("/public/{nom}")
    public ResponseEntity<List<Pays>> getAllPays() {
        List<Pays> allPays = paysService.getAllPays();
        return ResponseEntity.ok(allPays);
    }
*/



    @PostMapping("/public/addcontact")
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        Contact addedContact = contactService.addContact(contact);
        return ResponseEntity.ok(addedContact);
    }
    @GetMapping("/public/contact/username/{username}")
    public ResponseEntity<List<Contact>> getContactsByUsername(@PathVariable String username) {
        List<Contact> contacts = contactService.findContactsByUsername(username);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/public/contact/contact/{contact}")
    public ResponseEntity<List<Contact>> getContactsByContact(@PathVariable String contact) {
        List<Contact> contacts = contactService.findContactsByContact(contact);
        return ResponseEntity.ok(contacts);

    }


}
