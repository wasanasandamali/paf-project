package com.example.foodiebackend.repository;

import com.example.foodiebackend.entity.Post;
import com.example.foodiebackend.service.PostService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostRepo extends CrudRepository<Post, Integer> {
    Post save(Post post);
    ArrayList<Post> findAll();
}
