import './SignUp.css'
import {useState} from "react";
import {storage,auth} from "../firebase";



function SignUp() {

    const [emailId, setEmailId] = useState(null);
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);


    const newSignUp = () => {

        auth.createUserWithEmailAndPassword(emailId, password)
            .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;

                    let payload = {
                        "userId": user.uid,
                        "userName": userName,
                        "name": name,
                        "profileImage": ""
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/users", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem("users", JSON.stringify(user));
                            window.location.reload();
                        })
                        .catch(error => {

                        })

                    // ...
                })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });

    }


    return (
        <div>
            <input className='loginpage_text' onChange={(event) => { setEmailId(event.currentTarget.value); }} type='text' placeholder='Mobile Number or Email'/>
            <input className='loginpage_text' onChange={(event) => { setName(event.currentTarget.value); }} type='text' placeholder='Full Name'/>
            <input className='loginpage_text' onChange={(event) => { setUserName(event.currentTarget.value); }} type='text' placeholder='Username'/>
            <input className='loginpage_text' onChange={(event) => { setPassword(event.currentTarget.value); }} type='password' placeholder='Password'/>
            <button className='login_button' onClick={newSignUp} >Sign Up</button>
        </div>
    )
}

export default SignUp;