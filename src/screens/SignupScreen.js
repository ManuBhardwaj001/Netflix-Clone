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
            console.log("User registered with email:", authUser.user.email);
        }).catch(error => {
            alert(error.message);
        });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log("User signed in with email:", authUser.user.email);
        }).catch(error => alert(error.message));
    }

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email or phone number" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button onClick={signIn} type="submit">Sign In</button>
                <div className="signupScreen__bottom">
                    <div className="remember__needHelp">
                        <div className="remember">
                            <input className="checkbox__remember" id="rememberMe" type="checkbox" value="true" />
                            <label htmlFor="rememberMe">
                                <span className="label__remember">Remember me</span>
                            </label>
                        </div>
                        <span className="needHelp">Need help?</span>
                    </div>
                    <div className="singupScreen__register">
                        <span className="signupScreen__gray">New to Netflix? </span><span onClick={register} className="signupScreen__link">Sign Up now</span>
                    </div>
                    <div className="signupScreen__recaptcha">
                        <p className="recaptcha">
                            <span>Sign in is protected by Google reCAPTCHA to ensure you’re not a bot.</span>
                            &nbsp;
                            <button className="captcha__learnMore">
                                Learn more.
                            </button>
                        </p>
                        <div className="recaptcha__disclosure">
                            <span>The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupScreen;
