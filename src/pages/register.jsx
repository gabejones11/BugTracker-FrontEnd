import React from "react";
import { useState } from "react";
import { useLocalState } from "../utility/UseLocalStorage";
import {
  validatePasswords,
  validateEmptyField,
  validateEmail,
} from "../utility/Validation";
import "../styles/login.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendRegisterRequest() {
    if (
      !validateEmptyField(firstName) ||
      !validateEmptyField(lastName) ||
      !validateEmptyField(email) ||
      !validateEmptyField(password) ||
      !validateEmptyField(passwordTwo)
    ) {
      alert("One or more required fields is empty");
      return;
    }

    if (!validatePasswords(password, passwordTwo)) {
      alert("Passwords do not match");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/api/v1/auth/register", {
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
        return Promise.reject("Invalid register attempt");
      })
      .then(([body]) => {
        setJwt(body.token);
        window.location.href = "/login";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-white vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2 className="fw-bold text-center">Create an Account</h2>
        <form action="">
          <div className="mb-3 text-start">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="form-control rounded-0"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control rounded-0"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <div className="mb-3 text-start">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              placeholder="●●●●●●●●"
              className="form-control rounded-0"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
          </div>
          <div>
            <button
              className="btn w-100 fw-bold mb-3"
              style={{ backgroundColor: "#FF5364", color: "#FFFFFF" }}
              onClick={(e) => {
                e.preventDefault();
                sendRegisterRequest();
              }}
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="mb-3 text-center">
          <p>
            Already have an account?{" "}
            <a className="already-have-account-text" href="/login">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
