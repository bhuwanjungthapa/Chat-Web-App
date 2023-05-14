import React, { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "./usercontext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username, onLogout, onSearch, searchProp }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState(""); // Local state to manage the search input
  useEffect(() => {
    console.log("Navbar rendered, search state:", search);
  });

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
    <nav className="p-6 bg-blue-500 text-white sticky top-0 z-50">
      <div className="flex items-center">
        <span className="font-bold">Hello, {user?.username}</span>
        <button
          className="ml-4 sm:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => console.log("Mobile Menu Clicked")}
        >
          Menu
        </button>
      </div>
      <div className="flex justify-between mt-4 sm:mt-0">
        <div className="w-full sm:w-auto flex items-center">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Search..."
            className="px-3 py-2 text-black bg-white rounded"
          />
          <button
            onClick={handleLogoutClick}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <div className="hidden sm:block">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
