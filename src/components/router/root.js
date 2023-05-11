import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../common/login";
import Register from "../common/register";
import Dashboard from "../common/dashboard";
import Message from "../common/message";
import Group from "../common/group";

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/message" element={<Message />} />
      <Route path="/group" element={<Group />} />
    </Routes>
  </Router>
);

export default Root;
