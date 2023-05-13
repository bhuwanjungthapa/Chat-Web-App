import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./usercontext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/.json"
        );
        const data = await response.json();
        const users = Object.values(data.users); // Access 'users' property and convert to array
        setUserList([...users, { username: "Group Chat" }]); // Add group chat object to userList state
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserList();
    const interval = setInterval(fetchUserList, 3000); // Fetches every 3 seconds
    return () => clearInterval(interval); // Clears interval on component unmount
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar username={user?.username} onLogout={handleLogout} />
      <div className="h-screen bg-gray-200">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 text-lg font-semibold">
              Direct Messages
            </div>
            <div className="-mx-2 my-2 max-h-screen overflow-y-auto">
              {userList
                .filter((otherUser) => otherUser.email !== user?.email)
                .map((otherUser, index) => (
                  <div
                    key={index}
                    className="hover:bg-gray-100 px-4 py-3 flex items-center cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {otherUser.username === "Group Chat" ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src="https://via.placeholder.com/150"
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={`https://i.pravatar.cc/150?u=${otherUser.email}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        {otherUser.username}
                      </div>
                      {otherUser.username === "Group Chat" ? (
                        <Link
                          to={{
                            pathname: "/group",
                            search: `?sender=${user?.email}&recipient=${userList
                              .filter((u) => u.username !== "Group Chat")
                              .map((u) => u.email)
                              .join(",")}`,
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          Group Chat
                        </Link>
                      ) : (
                        <Link
                          to={`/message?sender=${user?.email}&recipient=${otherUser.email}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          {otherUser.email}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
