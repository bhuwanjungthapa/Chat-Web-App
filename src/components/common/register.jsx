import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/users.json",
        {
          username,
          email,
          password,
        }
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mb-4"
            type="submit"
          >
            Login
          </button>
          <div
            className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-500 ease-in-out"
            onClick={() => navigate("/login")}
          >
            <p>
              Already had a account?{" "}
              <span className="underline">Click here to login</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
