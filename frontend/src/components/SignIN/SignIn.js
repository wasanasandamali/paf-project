import '../LoginPage/LoginPage.css'
import {storage,auth} from "../firebase";
import { useState } from 'react';

function SignIn() {

    const [emailId, setEmailId] = useState(null);
    const [password, setPassword] = useState(null);

    const login = () => {

        auth.signInWithEmailAndPassword(emailId, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("users", JSON.stringify(user));
                window.location.reload();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (<div>
        <input className='loginpage_text' onChange={(event) => setEmailId(event.currentTarget.value)} type='text'  placeholder='Phone number, username or email'/>
        <input className='loginpage_text' onChange={(event) => setPassword(event.currentTarget.value)} type='password' placeholder='Password'/>
        <button className='login_button' onClick={login}>Log In</button>
    </div>)
}

export default SignIn;