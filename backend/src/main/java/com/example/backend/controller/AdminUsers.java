package com.example.backend.controller;
import com.example.backend.entity.OurUsers;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import com.example.backend.dto.ReqRes;
import com.example.backend.entity.Product;
import com.example.backend.entity.Pays;
import com.example.backend.service.PaysService;
import com.example.backend.entity.Contact;
import com.example.backend.service.ContactService;
import com.example.backend.service.OurUserDetailsService;
import com.example.backend.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminUsers {

    @Autowired
    private ProductRepo productRepo;
    private final PaysService paysService;
    private final ContactService contactService;
    private final OurUserDetailsService ourUsersService;
    @Autowired
    public AdminUsers(PaysService paysService, ContactService contactService,OurUserDetailsService ourUsersService) {
        this.paysService = paysService;
        this.contactService = contactService;this.ourUsersService = ourUsersService;

    }


    @GetMapping("/public/searchemail/{email}")
    public ResponseEntity<UserDetails> getUserByEmail(@PathVariable String email) {
        try {
            UserDetails userDetails = ourUserDetailsService.loadUserByUsername(email);
            return ResponseEntity.ok(userDetails);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/public/addfriend/{userId}/{friendId}")
    public ResponseEntity<OurUsers> addFriend(@PathVariable int userId, @PathVariable int friendId) {
        OurUsers user = ourUsersService.getUserById(userId);

        ourUsersService.addFriend(userId, friendId);
        return ResponseEntity.ok(user);
    }
    /*

    @PostMapping("/public/friends")
    public ResponseEntity<OurUsers> addFriend(@RequestParam int userId, @RequestParam int friendId) {
        OurUsers user = ourUsersService.getUserById(userId);
        OurUsers friend = ourUsersService.getUserById(friendId);
        ourUsersService.addFriend(user, friend);
        return ResponseEntity.ok(user);
    }*/
    //Pays section
    @PostMapping("/admin/addpays")

    public ResponseEntity<Pays> addPays(@RequestBody Pays pays) {
        Pays newPays = paysService.addPays(pays);
        return ResponseEntity.ok(newPays);
    }
    @GetMapping("/user/alone")
    public ResponseEntity<Object> userAlone(){
        return ResponseEntity.ok("USers alone can access this ApI only");
    }

    @GetMapping("/adminuser/both")
    public ResponseEntity<Object> bothAdminaAndUsersApi(){
        return ResponseEntity.ok("Both Admin and Users Can  access the api");
    }

    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @GetMapping("/public/search-by-phone/{phoneNumber}")
    public ResponseEntity<OurUsers> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        Optional<OurUsers> user = ourUserDetailsService.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
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
