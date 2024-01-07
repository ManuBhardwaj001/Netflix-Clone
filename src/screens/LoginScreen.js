import React, { useState } from "react";
import "./LoginScreen.css"
import Netflix_Logo_RGB from "../image/Netflix_Logo_RGB.png"
import "./SignupScreen";
import SignupScreen from "./SignupScreen";

function LoginScreen() {

    const [signIn, setSignIn] = useState(false)

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <div className="loginScreen__logo__signin">
                    <img className="loginScreen__logo"
                        src={Netflix_Logo_RGB} alt="" />
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
                        Unlimited movies, TV shows and more</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <h3>
                            Ready to watch? Enter your email to create or restart your membership.
                        </h3>

                        <div className="loginScreen__input">
                            <form>
                                <input autoComplete="email" maxLength="50" type="email" placeholder="Email address" />
                                <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">
                                    Get Started
                                    <svg xmlns="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24" fill="none" data-mirrorinrtl="true" className="default-ltr-cache-4z3qvp e1svuwfo1" data-name="ChevronRight" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="#FFFFFF"></path></svg>
                                </button>
                            </form>
                        </div>
                    </>)}
            </div>
        </div>

    );
}

export default LoginScreen;
