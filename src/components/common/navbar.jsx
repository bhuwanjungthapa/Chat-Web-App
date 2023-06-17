import React, { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "./usercontext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ username, onLogout, onSearch, searchProp }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className="p-6 bg-blue-500 text-white sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold">Hello, {user?.username}</span>
        </div>
        {(location.pathname === "/message" ||
          location.pathname === "/group") && (
          <button
            className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}
        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
