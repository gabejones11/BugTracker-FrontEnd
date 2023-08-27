import { React, useEffect } from "react";
import { useState } from "react";
import { useLocalState } from "../utility/UseLocalStorage";
import "../styles/login.css";
import { validateEmptyField } from "../utility/Validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userId, setUserId] = useLocalState("", "userId");

  useEffect(() => {
    if (jwt) {
      getUserId();
    }
  }, [jwt]);

  function sendLoginRequest() {
    if (!validateEmptyField(email) || !validateEmptyField(password)) {
      alert("One or more required fields is empty");
      return;
    }

    const requestBody = {
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/api/v1/auth/authenticate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        }
        return Promise.reject("Invalid login attempt");
      })
      .then(([body]) => {
        setJwt(body.accessToken);
      })
      .catch((message) => {
        alert(message);
      });
  }

  function getUserId() {
    console.log("jwt", jwt);
    return fetch(`http://localhost:8080/api/v1/users/${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
        return response.json();
      })
      .then((user) => {
        setUserId(user.id);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  }

  return (
    <div className="d-flex justify-content-left align-items-center bg-white vh-100 container">
      <div className="bg-white p-3 rounded w-50">
        <h2 className="fw-bold text-center">Welcome!</h2>
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="●●●●●●●●"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn w-100 fw-bold mb-3 login-button"
            style={{ backgroundColor: "#FF5364", color: "#FFFFFF" }}
            onClick={(e) => {
              e.preventDefault();
              sendLoginRequest();
            }}
          >
            Log in
          </button>
        </form>
        <div className="mb-3 text-center">
          <p>
            Don't have an account?{" "}
            <a className="no-account-text" href="/register">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div className="position-fixed top-0 end-0 p-3 grey-square"></div>
      <img src="./images/bug.png" alt="Bug Logo" className="bug-logo" />
      <div className="position-fixed bottom-0 end-0 p-3 red-square"></div>
    </div>
  );
}

export default Login;
