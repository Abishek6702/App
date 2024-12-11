import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookTicket from './components/BookTicket';
import CancelTicket from './components/CancelTicket.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import AdminDashboard from './components/AdminDashboard.js';
import Home from './components/Home.js';  
import Dashboard from './components/dashboard.js';
import './App.css';

function App() {
  return (
    <Router>
     
      <Navbar />
      
      <Routes>
      <Route path="/" element={<Home />} />  {/* Add the Home route */}
        <Route path="/book-ticket" element={<BookTicket/>} />
        <Route path="/cancel-ticket" element={<CancelTicket/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
