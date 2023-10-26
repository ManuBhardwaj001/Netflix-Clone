import React, { useState } from "react";
import "./LoginScreen.css"
import "./SignupScreen";
import SignupScreen from "./SignupScreen";

function LoginScreen() {

    const [signIn, setSignIn] = useState(false)

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <div className="loginScreen__logo__signin">
                    <img className="loginScreen__logo"
                        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                    <button onClick={() => setSignIn(true)}
                        className="loginScreen__button">Sign In</button>
                </div>
            </div>

            <div className="loginScreen__gradient" />
            <div className="loginScreen__body">
                {signIn ? (
                    <SignupScreen />
                ) : (
                    <>
                        <h1>
                            Enjoy big movies, hit series and more<br /> from ₹&nbsp;149.</h1>
                        <h2>Join today. Cancel anytime.</h2>
                        <h3>
                            Ready to watch?Enter your email to create or restart your membership.
                        </h3>

                        <div className="loginScreen__input">
                            <form>
                                <input autoComplete="email" maxLength="50" type="email" placeholder="Email Address" />
                                <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>)}
            </div>
        </div>

    );
}

export default LoginScreen;
