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
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          "https://nestnepal-frontend-chat-app-default-rtdb.firebaseio.com/.json"
        );
        const data = await response.json();
        const users = Object.values(data.users); // Access 'users' property and convert to array
        setUserList(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserList();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar username={user?.username} onLogout={handleLogout} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Messages
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userList.map((otherUser, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {otherUser.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link
                          onClick={() =>
                            console.log(
                              `/message?sender=${user?.email}&recipient=${otherUser.email}`
                            )
                          }
                          to={`/message?sender=${user?.email}&recipient=${otherUser.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {otherUser.email}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
