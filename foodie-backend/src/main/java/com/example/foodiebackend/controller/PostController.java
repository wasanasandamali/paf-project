package com.example.foodiebackend.controller;

import com.example.foodiebackend.entity.Post;
import com.example.foodiebackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("")
    private Post submitUserPost(@RequestBody Post post){
        return postService.submitPostToDatabase(post);
    }

    @GetMapping("")
    private ArrayList<Post> getAllPost(){
        return postService.retrievePostFromDB();
    }

}
