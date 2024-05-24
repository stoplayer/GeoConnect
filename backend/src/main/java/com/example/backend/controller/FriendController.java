package com.example.backend.controller;

import com.example.backend.entity.Friend;
import com.example.backend.entity.OurUsers;
import com.example.backend.repository.FriendRepository;
import com.example.backend.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private OurUserRepo ourUsersRepository;

    // Create a new Friend
    /*
    @PostMapping
   /public Friend createFriend(@RequestBody Friend friend) {
        // Optional: Add logic to verify the existence of sourceUser and targetUser
        return friendRepository.save(friend);
    }
*/
    @PostMapping
    public ResponseEntity<Friend> createFriend(@RequestBody Friend friend) {
        Optional<OurUsers> sourceUser = ourUsersRepository.findById(friend.getSourceUser().getId());
        Optional<OurUsers> targetUser = ourUsersRepository.findById(friend.getTargetUser().getId());

        if (sourceUser.isPresent() && targetUser.isPresent()) {
            friend.setSourceUser(sourceUser.get());
            friend.setTargetUser(targetUser.get());
            Friend newFriend = friendRepository.save(friend);
            return ResponseEntity.ok(newFriend);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get all Friends
    @GetMapping
    public List<Friend> getAllFriends() {
        return friendRepository.findAll();
    }

    // Get a single Friend by ID
    @GetMapping("/{id}")
    public ResponseEntity<Friend> getFriendById(@PathVariable(value = "id") Integer friendId) {
        Optional<Friend> friend = friendRepository.findById(friendId);
        if (friend.isPresent()) {
            return ResponseEntity.ok().body(friend.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a Friend
    @PutMapping("/{id}")
    public ResponseEntity<Friend> updateFriend(@PathVariable(value = "id") Integer friendId, @RequestBody Friend friendDetails) {
        Optional<Friend> optionalFriend = friendRepository.findById(friendId);
        if (optionalFriend.isPresent()) {
            Friend friend = optionalFriend.get();
            friend.setSourceUser(friendDetails.getSourceUser());
            friend.setTargetUser(friendDetails.getTargetUser());
            final Friend updatedFriend = friendRepository.save(friend);
            return ResponseEntity.ok(updatedFriend);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Friend
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFriend(@PathVariable(value = "id") Integer friendId) {
        Optional<Friend> friend = friendRepository.findById(friendId);
        if (friend.isPresent()) {
            friendRepository.delete(friend.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
