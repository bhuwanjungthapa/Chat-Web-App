import React from "react";
import { useContext } from "react";
import UserContext from "./usercontext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className="p-6 bg-blue-500 text-white flex justify-between">
      {username && (
        <>
          <span className="font-bold">Hello, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
