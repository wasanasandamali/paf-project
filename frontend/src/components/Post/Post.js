import './Post.css'
import Avatar from "@mui/material/Avatar";
import postimage from '../../images/post.jpg'
import love from '../../images/love.svg'
import comment from '../../images/comment.svg'
import share from '../../images/share.svg'
import {useEffect, useState} from "react";


function Post(props) {

    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        getComment();
    }, []);

    const getComment = () => {
        // let data =
        //     [
        //         {
        //             userName: "David Mangala",
        //             commentId: 1234,
        //             timeStamp: 6372,
        //             description: "comment 1"
        //         },
        //         {
        //             userName: "Sumathi pera",
        //             commentId: 1234,
        //             timeStamp: 6372,
        //             description: "comment 2"
        //         },
        //         {
        //             userName: "haxan sam",
        //             commentId: 1234,
        //             timeStamp: 6372,
        //             description: "comment 3"
        //         }
        //     ]

        fetch(`http://localhost:8080/comments/${props.id}`)
            .then(response => response.json())
            .then(data => {
                setCommentList(data);
            });


    }


    const submitComments = (event) => {
        if (event.key === "Enter") {
            let comment = event.currentTarget.value;
            if (comment !== null || comment !== undefined) {
                let payload = {
                    "commentId": Math.floor(Math.random() *
                        1000000).toString(),
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "postId": props.id,
                    "timeStamp": new Date().getTime(),
                    "comment": comment
                }

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }

                fetch("http://localhost:8080/comments", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        getComment();
                    })
                    .catch(error => {

                    })
            }
        }
    }

    return (
        <div className="post_container">
            {/*Header*/}
            <div className="post_header">
                <Avatar className="post_image" src={props.profileImage}/>
                <div className="post_username">{props.userName}</div>
            </div>

            {/*Image*/}
            <div>
                <img src={props.postImage} width='615px'/>
            </div>

            {/*Analytics*/}
            <div>
                <div style={{marginLeft: "5px"}}>
                    <img src={love} className='post_reactimage'/>
                    <img src={comment} className='post_reactimage'/>
                    <img src={share} className='post_reactimage'/>
                </div>
                <div style={{fontWeight: "bold", marginLeft: "20px"}}>{props.likes}</div>
            </div>

            {/*Comment section*/}
            <div>

                {
                    commentList.map((item, index) => {
                            return (
                                <div className='post_comment' key={index}>{item.userName}: {item.comment}</div>
                            )
                        }
                    )
                }

                <input className='post_commentbox' onKeyDown={submitComments} type="text" placeholder="Add a comment"/>
            </div>
        </div>

    )
}

export default Post;