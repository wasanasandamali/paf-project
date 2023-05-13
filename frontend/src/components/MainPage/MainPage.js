import './MainPage.css'
import Post from "../Post/Post";
import {useState, useEffect} from "react";
import uploadImage from '../../images/upload.png'
import {storage,auth} from "../firebase";

function MainPage() {

    const [postList, setPostList] = useState([])
    const [progressBar, setProgressBar] = useState(0);

    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        // let data = [
        //     {
        //         postId: 123,
        //         userName: "buddy",
        //         postImageUrl: 'https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg',
        //         timeStamp: "2909",
        //         likes: 783
        //     },
        //     {
        //         postId: 123,
        //         userName: "buddy",
        //         postImageUrl: 'https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg',
        //         timeStamp: "2909",
        //         likes: 783
        //     },
        //     {
        //         postId: 123,
        //         userName: "buddy",
        //         postImageUrl: 'https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg',
        //         timeStamp: "2909",
        //         likes: 783
        //     }
        // ]

        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                setPostList(data);
            });

    }

    const upload = (event) => {
        let image = event.target.files[0];
        if (image == null)

            return;

        var uploadTask = storage.ref("images").child(image.name).put(image);
        uploadTask.on(
            "state_changed",
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(progress);
            },
            function (error) {
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(downloadURL);

                    let payload = {
                        "postId": Math.floor(Math.random() * 100000).toString(),
                        "userId": JSON.parse(localStorage.getItem("users")).uid,
                        "postPath": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likeCount": 0
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/post", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            getData();
                        })
                        .catch(error => {

                        })

                })
            }
        );
    }


    return (

        <div>
            <div className='mainpage_container'>
                <div className='mainpage_divider'></div>
                <div className="fileupload">
                    <label htmlFor="file-upload">
                        <img className='mainpage_uploadicon' src={uploadImage}/>
                    </label>
                    <input onChange={upload} id="file-upload" type="file"/>
                </div>
                <div className='mainpage_divider'></div>
            </div>
            <div className="upload_text">{progressBar}</div>

            {
                postList.map((item, index) => {
                    return (
                        <Post key={index} id={item.postId} userName={item.userName} postImage={item.postPath}
                              likes={item.likes}/>
                    )
                })
            }
        </div>
    )
}

export default MainPage;