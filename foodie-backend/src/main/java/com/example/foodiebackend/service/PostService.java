package com.example.foodiebackend.service;

import com.example.foodiebackend.entity.Post;
import com.example.foodiebackend.entity.Status;
import com.example.foodiebackend.repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
public class PostService {

    @Autowired
    PostRepo postRepo;

    @Autowired
    UserService userService;


    public Post submitPostToDatabase(Post post){
        return postRepo.save(post);
    }

    public ArrayList<Post> retrievePostFromDB(){

        ArrayList<Post> postList=postRepo.findAll();

        for(int i=0; i<postList.size();i++){
            Post postItem=postList.get(i);
            postItem.setUserName(userService.displayUserMetaData(postItem.getUserId()).getUserName());
        }
        Collections.sort(postList,(a,b)->b.getId()-a.getId());
        return postList;
    }

}
