package com.example.foodiebackend.repository;

import com.example.foodiebackend.entity.Comments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommentRepo extends CrudRepository<Comments, Integer> {
    Comments save(Comments comment);
    ArrayList<Comments> findAllByPostId(String postId);
}
