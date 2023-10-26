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
                                    <svg xmlns="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 24 24" fill="none" data-mirrorinrtl="true" class="default-ltr-cache-4z3qvp e1svuwfo1" data-name="ChevronRight" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="#FFFFFF"></path></svg>
                                </button>
                            </form>
                        </div>
                    </>)}
            </div>
        </div>

    );
}

export default LoginScreen;
