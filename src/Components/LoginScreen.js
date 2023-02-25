import React from "react";
import { useState } from "react";
import "../css/LoginScreen.css";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import { useNavigate } from "react-router-dom";
function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          alt="netflix logo"
          className="loginScreen__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
          onClick={() => navigate("/")}
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn || signUp ? (
          (signIn && <SigninScreen />) || (signUp && <SignupScreen />)
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  className="loginScreen_getStarted"
                  onClick={() => setSignUp(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
