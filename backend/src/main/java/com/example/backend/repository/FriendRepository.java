package com.example.backend.repository;

import com.example.backend.entity.Friend;
import com.example.backend.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
}
