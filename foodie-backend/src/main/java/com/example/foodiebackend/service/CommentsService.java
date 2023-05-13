package com.example.foodiebackend.service;

import com.example.foodiebackend.entity.Comments;
import com.example.foodiebackend.entity.Status;
import com.example.foodiebackend.repository.CommentRepo;
import com.example.foodiebackend.repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CommentsService {

    @Autowired
    CommentRepo commentRepo;

    @Autowired
    UserService userService;

    public Comments submitCommentToDB(Comments comments){
        return commentRepo.save(comments);
    }

    public ArrayList<Comments> getAllCommentsForDB(String postId){

        ArrayList<Comments> commentsList=commentRepo.findAllByPostId(postId);

        for(int i=0; i<commentsList.size();i++){
            Comments commentItem=commentsList.get(i);
            commentItem.setUserName(userService.displayUserMetaData(commentItem.getUserId()).getUserName());
        }
        return commentsList;
    }

}
