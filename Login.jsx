import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';

const Login = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const handleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
            }).catch((error) => {
                // Handle errors here
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div className="h-screen mx-auto container flex items-center justify-center">
            <button className='bg-blue px-8 py-2 text-white' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;
