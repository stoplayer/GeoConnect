package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "ourusers")
public class OurUsers implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String phonenumber;
    private byte[] photo;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateInscription;
    private String role;

    @ManyToOne
    private Pays pays;

    @OneToMany(mappedBy = "sourceUser")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Friend> friendslist = new ArrayList<>();
/*
    @ManyToMany
    @JoinTable(
            name="user_friends",
            joinColumns = @JoinColumn (name="id"),
            inverseJoinColumns = @JoinColumn(name="friend_id")

    )
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<OurUsers> friends;*/
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }
//    public void addFriend(OurUsers friend) {
//        this.friends.add(friend);
//        friend.friends.add(this);
//    }
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @PrePersist
    protected void onCreate() {
        this.dateInscription = new Date();
    }


}
