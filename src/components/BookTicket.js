import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function BookTicket() {
  const [stoppingPoint, setStoppingPoint] = useState('');
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const fetchBuses = async () => {
    if (!stoppingPoint) {
      alert('Please enter a stopping point');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/buses/${stoppingPoint}`);
      if (response.data.length === 0) {
        alert('No buses available for this stopping point');
      }
      setBuses(response.data);
    } catch (err) {
      console.error('Error fetching buses:', err);
      alert('An error occurred while fetching buses. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.mobile || !userDetails.email || !selectedBus || !selectedStop) {
      alert('Please fill all fields and select a bus and stop.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userDetails.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(userDetails.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const bookTicketResponse = await axios.post('http://localhost:5000/api/users/book-ticket', {
        name: userDetails.name,
        mobile: userDetails.mobile,
        email: userDetails.email,
        busId: selectedBus,
        stopId: selectedStop,
      });

      if (bookTicketResponse.status === 200) {
        const { ticketId, busNumber, stopName } = bookTicketResponse.data;

        const doc = new jsPDF();
        doc.text(`Ticket ID: ${ticketId}`, 10, 10);
        doc.text(`Name: ${userDetails.name}`, 10, 20);
        doc.text(`Mobile: ${userDetails.mobile}`, 10, 30);
        doc.text(`Email: ${userDetails.email}`, 10, 40);
        doc.text(`Bus Number: ${busNumber}`, 10, 50);
        doc.text(`Stopping Point: ${stopName}`, 10, 60);

        doc.save('ticket.pdf');

        alert('Ticket booked successfully!');
      }
    } catch (err) {
      console.error('Error booking ticket:', err.response?.data || err);
      alert(`An error occurred: ${err.response?.data?.error || 'Please try again.'}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-90 pt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Book Ticket</h2>

      <div className="mb-6">
        <input
          type="text"
          value={stoppingPoint}
          onChange={(e) => setStoppingPoint(e.target.value)}
          placeholder="Enter stopping point"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={fetchBuses}
        className="block mx-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Search Buses
      </button>

      {buses.length > 0 && (
        <div className="mt-6">
          <select
            onChange={(e) => setSelectedBus(e.target.value)}
            value={selectedBus}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.busNumber} - {bus.availableSeats} seats available
              </option>
            ))}
          </select>

          <input
            type="text"
            value={selectedStop}
            onChange={(e) => setSelectedStop(e.target.value)}
            placeholder="Enter stop name"
            className="w-full p-3 mt-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={userDetails.mobile}
          onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
}

export default BookTicket;
