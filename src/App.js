import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginScreen from "./Components/LoginScreen";
import React from "react";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./userSlice";
import Home from "./Components/Home";
import ProfileScreen from "./Components/ProfileScreen";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in

        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
