package com.example.backend.service;

import com.example.backend.entity.OurUsers;
import com.example.backend.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OurUserDetailsService implements UserDetailsService {

    @Autowired
    private OurUserRepo ourUserRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return ourUserRepo.findByEmail(username).orElseThrow();
    }

    public Optional<OurUsers> findByPhoneNumber(String phoneNumber) {
        return ourUserRepo.findByPhonenumber(phoneNumber);
    }

    public OurUsers getUserById(int id) {
        return ourUserRepo.findById(id).orElseThrow();
    }

}