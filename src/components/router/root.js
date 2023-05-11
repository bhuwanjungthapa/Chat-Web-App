import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../common/login";
import Register from "../common/register";
import Dashboard from "../common/dashboard";
import Message from "../common/message";

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/message" element={<Message />} />
    </Routes>
  </Router>
);

export default Root;
