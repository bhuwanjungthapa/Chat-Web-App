import React, { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "./usercontext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username, onLogout, onSearch, searchProp }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState(""); // Local state to manage the search input

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleLogoutClick = () => {
    setUser(null);
    onLogout(); // Call onLogout prop function when logout button is clicked
  };

  return (
    <nav className="p-6 bg-blue-500 text-white flex justify-between">
      {username && (
        <div className="flex justify-between w-full">
          <span className="font-bold">Hello, {user?.username}</span>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <div className="flex space-x-4">
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Search..."
              style={{ color: "black" }}
            />
            <button
              onClick={handleLogoutClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
