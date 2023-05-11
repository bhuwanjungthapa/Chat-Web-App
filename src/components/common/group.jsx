import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import { useContext } from "react";
import UserContext from "./usercontext";
import axios from "axios";

const Group = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/group.json"
      );
      const data = response.data;
      const groupMessages = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setMessages(groupMessages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetches every 5 seconds
    return () => clearInterval(interval); // Clears interval on component unmount
  }, [fetchMessages]);

  const sendMessage = async (sender, message) => {
    await axios.post(
      "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/group.json",
      {
        sender: sender,
        message: message,
      }
    );
    fetchMessages();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(user.email, message);
    setMessage("");
  };
  return (
    <>
      <Navbar username={user?.username} />
      <div className="flex justify-center h-full py-6 bg-gray-100">
        <div className="w-full max-w-2xl rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="p-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === user.email ? "text-right" : ""
                }`}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <div
                    className={`font-medium text-lg ${
                      msg.sender === user.email ? "ml-auto" : "text-blue-500"
                    }`}
                  >
                    {msg.sender === user.email ? "You" : msg.sender}
                  </div>
                </div>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="border-t-2">
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="message"
                >
                  Message to Group
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="4"
                  placeholder="Type your message here"
                  value={message}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
