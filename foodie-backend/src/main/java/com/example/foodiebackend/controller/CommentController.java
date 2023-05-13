package com.example.foodiebackend.controller;

import com.example.foodiebackend.entity.Comments;
import com.example.foodiebackend.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    CommentsService commentsService;


    @PostMapping("")
    private Comments submitComment(@RequestBody Comments comments){
        return commentsService.submitCommentToDB(comments);
    }

    @GetMapping("/{postId}")
    private ArrayList<Comments> getCommentsForPost(@PathVariable("postId") String postId){
        return commentsService.getAllCommentsForDB(postId);
    }

}
