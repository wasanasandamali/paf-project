package com.example.foodiebackend.service;

import com.example.foodiebackend.entity.Users;
import com.example.foodiebackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Users submitMetaDataOfUser(Users user){
        return userRepo.save(user);
    }

    public Users displayUserMetaData(String userid){
        return userRepo.findByUserId(userid);
    }

}
