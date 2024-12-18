import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import SelectionPage from "./pages/SelectionPage";
import VendorSignupLogin from "./pages/VendorSignupLogin";
import AddTickets from "./pages/AddTickets";
import CustomerSignupLogin from "./pages/CustomerSignupLogin";
import TicketPage from "./pages/TicketPage";
import NavBar from "./components/NavBar";
import Logout from "./pages/Logout";
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/vendorLog" element={<VendorSignupLogin />} />
        <Route path="/addTickets" element={<AddTickets />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/customerLog" element={<CustomerSignupLogin />} />
        <Route path="/ticketPage" element={<TicketPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
