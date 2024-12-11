import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

function App() {
  // Bus Management States
  const [buses, setBuses] = useState([]);
  const [editBus, setEditBus] = useState(null);
  const [busForm, setBusForm] = useState({
    busNumber: "",
    route: "",
    availableSeats: 0,
  });

  // Admin Management States
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });

  // User Management States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // User Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    fetchData();
    // Check if the user is authenticated (You can use JWT or session-based logic here)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // If token exists, set the user as authenticated
    }
  }, []);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const busesResponse = await axios.get("http://localhost:5000/buses");
      const adminsResponse = await axios.get("http://localhost:5000/admins");
      const usersResponse = await axios.get("http://localhost:5000/users");

      setBuses(busesResponse.data);
      setAdmins(adminsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input form changes (generic)
  const handleInputChange = (e, formSetter, formState) => {
    formSetter({ ...formState, [e.target.name]: e.target.value });
  };

  // Submit Bus Form
  const handleBusSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editBus) {
        await axios.put(`http://localhost:5000/buses/${editBus._id}`, {
          ...busForm,
          route: busForm.route.split(","),
        });
      } else {
        await axios.post("http://localhost:5000/buses", {
          ...busForm,
          route: busForm.route.split(","),
        });
      }
      setEditBus(null);
      setBusForm({ busNumber: "", route: "", availableSeats: 0 });
      fetchData();
    } catch (error) {
      console.error("Error submitting bus form", error);
    }
  };

  // Submit Admin Form
  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editAdmin) {
        await axios.put(`http://localhost:5000/admins/${editAdmin._id}`, adminForm);
      } else {
        await axios.post("http://localhost:5000/admins", adminForm);
      }
      setEditAdmin(null);
      setAdminForm({ username: "", password: "" });
      fetchData();
    } catch (error) {
      console.error("Error submitting admin form", error);
    }
  };

  // Delete Bus
  const handleDeleteBus = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/buses/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting bus", error);
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admins/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting admin", error);
    }
  };

  // Edit Bus
  const handleEditBus = (bus) => {
    setEditBus(bus);
    setBusForm({
      busNumber: bus.busNumber,
      route: bus.route.join(","),
      availableSeats: bus.availableSeats,
    });
  };

  // Edit Admin
  const handleEditAdmin = (admin) => {
    setEditAdmin(admin);
    setAdminForm({
      username: admin.username,
      password: "", // Do not show password, allow to change
    });
  };

  // Render User Details
  const renderUserDetails = () => {
    return users.map((user) => (
      <li key={user._id} className=" border-b border-gray-200 py-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bus ID:</strong> {user.busId}</p>
        <p><strong>Stop ID:</strong> {user.stopId}</p>
        <p><strong>Ticket ID:</strong> {user.ticketId}</p>
      </li>
    ));
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear localStorage or session storage
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/"); // Use navigate to redirect to the login page
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">Bus and Admin Management</h1>

      {/* Loading Spinner */}
      {loading && <p className="text-center text-lg">Loading...</p>}

      {/* Logout Button (only shown if authenticated) */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mb-6"
        >
          Logout
        </button>
      )}

      {/* logout Button (only shown if not authenticated) */}
      {!isAuthenticated && (
        <button
          onClick={() => navigate("/admin")}
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-green-600 focus:outline-none mb-6"
        >
          logout
        </button>
      )}

      {/* Bus Management Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">Bus Management</h2>
        <form onSubmit={handleBusSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium mb-2">Bus Number:</label>
            <input
              type="text"
              name="busNumber"
              value={busForm.busNumber}
              onChange={(e) => handleInputChange(e, setBusForm, busForm)}
              required
              className="w-[100%] p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Route (comma-separated):</label>
            <input
              type="text"
              name="route"
              value={busForm.route}
              onChange={(e) => handleInputChange(e, setBusForm, busForm)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Available Seats:</label>
            <input
              type="number"
              name="availableSeats"
              value={busForm.availableSeats}
              onChange={(e) => handleInputChange(e, setBusForm, busForm)}
              min="0"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {editBus ? "Update Bus" : "Add Bus"}
          </button>
        </form>

        <ul className="mt-6 space-y-4">
          {buses.map((bus) => (
            <li key={bus._id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <p><strong>Bus Number:</strong> {bus.busNumber}</p>
              <p><strong>Route:</strong> {bus.route.join(", ")}</p>
              <p><strong>Available Seats:</strong> {bus.availableSeats}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEditBus(bus)}
                  className="py-2 px-4 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBus(bus._id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Admin Management Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">Admin Management</h2>
        <form onSubmit={handleAdminSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={adminForm.username}
              onChange={(e) => handleInputChange(e, setAdminForm, adminForm)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={adminForm.password}
              onChange={(e) => handleInputChange(e, setAdminForm, adminForm)}
              placeholder={editAdmin ? "Leave empty to keep the same" : "Enter new password"}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {editAdmin ? "Update Admin" : "Add Admin"}
          </button>
        </form>

        <ul className="mt-6 space-y-4">
          {admins.map((admin) => (
            <li key={admin._id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <p><strong>Username:</strong> {admin.username}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEditAdmin(admin)}
                  className="py-2 px-4 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAdmin(admin._id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* User Management Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">Ticket Management</h2>
        <ul className="space-y-4">{renderUserDetails()}</ul>
      </section>
    </div>
  );
}

export default App;