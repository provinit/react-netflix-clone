import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  const [show, handleshow] = useState(false);
  const navigate = useNavigate();
  const navTransition = () => {
    if (window.scrollY > 100) {
      handleshow(true);
    } else {
      handleshow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navTransition);

    return () => {
      window.removeEventListener("scroll", navTransition);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        onClick={() => navigate("/")}
      />
      <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Netflix Logo"
        onClick={() => navigate("/profile")}
      />
    </div>
  );
}

export default Nav;
