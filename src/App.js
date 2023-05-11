import React from "react";
import "./App.css";
import AppRoutes from "./components/router/root";
import UserContext from "./components/common/usercontext";
import useLocalStorage from "./components/common/useLocalStorage";

function App() {
  const [user, setUser] = useLocalStorage("user", {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRoutes />;
    </UserContext.Provider>
  );
}

export default App;
