"use client";
import React, { useState, useEffect } from "react";
// import './App.css';

export default function Home() {
  const [form, setForm] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState([]);
  const backendAPI = "https://mern-signup-backend.vercel.app/register";

  //<--------------------------------------------------------------------------------------------------->
  //fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendAPI);
        if (response.ok) {
          const data = await response.json();
          setUsernames(data);
        } else {
          console.log("Failed to fetch usernames");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  //<--------------------------------------------------------------------------------------------------->
  //to handle the from data
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //<--------------------------------------------------------------------------------------------------->
  //to handle the form default behaviour of refreshing
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("backendAPI", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Handle successful registration
      alert("Registration successful");
      /*setUsernames([...usernames, username]);
      setUsername('');
      setPassword('');*/ //
    } else {
      // Handle registration failure
      alert("User Already exsit or Registrastion error");
    }
  };

  //<--------------------------------------------------------------------------------------------------->
  //main return code
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleForm}
          required
        />
        <label>password</label>
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={handleForm}
          required
        />
        <input type="submit"></input>
      </form>
      {/* Display the list of usernames */}
      <div>
        <h4>Usernames:</h4>
        <ul>
          {usernames.map((user, index) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
