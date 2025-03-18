import React, { useContext, useState } from "react";
import "./Login.scss";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../firebase.js";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const signInWithGoogle = async () => {
    setIsGoogleSignIn(true);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user data to your backend
      const response = await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/user/google",
        {
          email: user.email,
          name: user.displayName,
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in with Google.");
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (isGoogleSignIn) return; // Skip email/password login
    setLoading(true);
    let url = "";
    if (currState === "Login") {
      url += "https://foodeli-backend-55b2.onrender.com/api/user/login";
    } else {
      url += "https://foodeli-backend-55b2.onrender.com/api/user/register";
    }

    const response = await axios.post(url, data);
    setLoading(false);
    setData({ name: "", email: "", password: "" });
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        {!token ? (
          <>
            <div className="login-title">
              <h2>
                {currState === "Login"
                  ? "Welcome Back, Foodie!"
                  : "Join, Foodeli ! "}
              </h2>
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt=""
              />
            </div>

            <div className="login-inputs">
              {currState === "Login" ? (
                <></>
              ) : (
                <input
                  onChange={onChangeHandler}
                  name="name"
                  value={data.name}
                  type="text"
                  placeholder="Your name"
                  required={!isGoogleSignIn} // Only required if not using Google Sign-In
                />
              )}
              <input
                onChange={onChangeHandler}
                name="email"
                value={data.email}
                type="email"
                placeholder="Your email"
                required={!isGoogleSignIn} // Only required if not using Google Sign-In
              />
              <input
                onChange={onChangeHandler}
                name="password"
                value={data.password}
                type="password"
                placeholder="Password"
                required={!isGoogleSignIn} // Only required if not using Google Sign-In
              />
            </div>
            <div className="button-container">
              <button type="submit" disabled={loading}>
                {loading
                  ? "Loading..."
                  : currState === "Sign Up"
                  ? "Join"
                  : "Login"}
              </button>
              <button
                className="google"
                type="button"
                onClick={signInWithGoogle}
              >
                {currState === "Sign Up"
                  ? "Join with Google"
                  : "Login with Google"}
              </button>
            </div>

            <div className="login-condition">
              <input type="checkbox" required={!isGoogleSignIn} />
              <p>
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </div>
            {currState === "Login" ? (
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </>
        ) : (
          <div className="profile-menu">
            <div className="login-title">
              <h2>Account</h2>
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt=""
              />
            </div>
            <br />
            <div className="login-inputs">
              <button
                onClick={() => {
                  setShowLogin(false);
                  navigate("/myorders");
                }}
              >
                My Orders
              </button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
