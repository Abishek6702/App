import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function AdminDashboard() {
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '',  });
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Handle Admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', adminCredentials);
      if (response.status === 200) {
        navigate('/dashboard'); // Navigate to the Dashboard page after successful login
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center pt-20 p-6">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
