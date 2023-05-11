import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { useContext } from "react";
import UserContext from "./usercontext";
import axios from "axios";

const Message = ({ senderEmail, recipientEmail }) => {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const location = useLocation();
  const { sender, recipient } = queryString.parse(location.search);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/messages.json"
      );
      const data = response.data;
      const userMessages = Object.values(data).filter(
        (msg) =>
          (msg.sender === sender && msg.recipient === recipient) ||
          (msg.sender === recipient && msg.recipient === sender)
      );
      setMessages(userMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // Fetches every 5 seconds
    return () => clearInterval(interval); // Clears interval on component unmount
  }, [user]);

  const sendMessage = (sender, recipient, message) => {
    axios
      .post(
        "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/messages.json",
        {
          sender: sender,
          recipient: recipient,
          message: message,
        }
      )
      .then((response) => {
        console.log("Message sent successfully:", response.data);
        fetchMessages();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Message from ${sender} to ${recipient}: ${message}`);
    sendMessage(sender, recipient, message);
    setMessage("");
  };
  return (
    <>
      <Navbar username={user?.username} />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.sender === user.email ? "text-right" : ""}`}
          >
            <p>
              <strong>{msg.sender === user.email ? "You" : msg.sender}:</strong>
            </p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message to {recipient}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Message;
