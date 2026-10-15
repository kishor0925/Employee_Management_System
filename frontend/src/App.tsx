import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CompanyMembers from "./pages/CompanyMembers";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="companymembers" element={<CompanyMembers />} />
          <Route path="EmployeeDetails/:id" element={<EmployeeDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
