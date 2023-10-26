import React, { useRef } from "react";
import "./SignupScreen.css";
import { auth } from "../firebase";

function SignupScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch(error => {
            alert(error.message)
        });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch(error => alert(error.message));
    }

    return <div className="signupScreen">
        <form >
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="Email" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button onClick={signIn} type="submit">Sign In</button>

            <div className="singupScreen__register">
                <span className="signupScreen__gray">New to Netflix? </span><span onClick={register} className="signupScreen__link">Sign Up now</span>
            </div>
        </form>
    </div>;
}

export default SignupScreen;
