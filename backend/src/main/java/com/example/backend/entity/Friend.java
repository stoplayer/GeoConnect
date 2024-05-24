package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne()
    @JoinColumn(name="sourceUser")
    private OurUsers sourceUser;
    @ManyToOne()
    @JoinColumn(name="targetUser")
    private OurUsers targetUser;

    public Friend() {

    }
}
