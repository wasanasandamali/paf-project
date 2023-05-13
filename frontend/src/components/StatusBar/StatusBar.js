import './StatusBar.css'
import Avatar from "@mui/material/Avatar";
import status_img from '../../images/pp1.png'
import {useEffect, useState} from "react";
import uploadimage from '../../images/statusadd.png'
import {storage,auth} from "../firebase";

function StatusBar() {

    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        // let data = [
        //     {
        //         username: "anindya_bunny",
        //         imageURL: "https://darresne.com/img/female-avatar.png"
        //     },
        //     {
        //         username: "abcs",
        //         imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //     },
        //     {
        //         username: "qwe",
        //         imageURL: "https://www.w3schools.com/w3css/img_avatar3.png"
        //     },
        //     {
        //         username: "jyjj",
        //         imageURL: "https://darresne.com/img/female-avatar.png"
        //     },
        //     {
        //         username: "jyjj",
        //         imageURL: "https://www.w3schools.com/w3css/img_avatar3.png"
        //     },
        //     {
        //         username: "jyjj",
        //         imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGonDgYzVXUcaKSWbvyH_ICVD23aI4zlRMJQ&usqp=CAU"
        //     },
        //     {
        //         username: "jyjj",
        //         imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //     },
        //     {
        //         username: "jyjj",
        //         imageURL: "../../images/pp1.png"
        //     }
        // ]

        fetch('http://localhost:8080/status')
            .then(response => response.json())
            .then(data => {
                setStatusList(data);
            });

    }


    const submitStatus = (event)=>{
        let image=event.target.files[0];
        if(image == null || image == undefined)
            return;

        var uploadTask = storage.ref("status").child(image.name).put(image);
        uploadTask.on(
            "state_changed",
            function (snapshot) {
            },
            function (error) {
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(downloadURL);

                    let payload = {
                        "statusId": Math.floor(Math.random()*100000).toString(),
                        "userId": JSON.parse(localStorage.getItem("users")).uid,
                        "path": downloadURL,
                        "timeStamp": new Date().getTime()
                    }

                    const requestOptions ={
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body : JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/status",requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            getData();
                        })
                        .catch(error =>{

                        })

                })
            }
        );
    }


    return (
        <div>
            <div className="statusbar_container">
                <div className="fileupload">
                    <label htmlFor="file-upload-status">
                        <img className="statusbar_upload" src={uploadimage} width="55px" height="55px" alt="Upload" />
                    </label>
                    <input id="file-upload-status" onChange={submitStatus} type="file" />
                </div>
                {
                    statusList.map((item, index) => (
                        <div className="status" key={index}>
                            <Avatar className="statusbar_status" src={item.path} />
                            <div className="statusbar_text">{item.userName}</div>
                        </div>
                    ))
                }
            </div>
        </div>)
}

export default StatusBar;