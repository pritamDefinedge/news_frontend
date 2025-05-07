import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/login/Login";

import ListUsers from "./pages/user/List";
import AddUser from "./pages/user/Add";
import EditUser from "./pages/user/Edit";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ListUsers />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="*" element={<>Not Ready</>} />
        </Route>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
