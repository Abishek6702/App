import React, { useState } from 'react';
import axios from 'axios';

function CancelTicket() {
  const [ticketId, setTicketId] = useState('');
  const [message, setMessage] = useState('');

  const handleCancel = async (e) => {
    e.preventDefault();

    try {
      // Send cancel request to the server
      const response = await axios.post('http://localhost:5000/api/users/cancel-ticket', { ticketId });
      
      if (response.status === 200) {
        setMessage('Ticket cancelled successfully!');
      } else {
        setMessage('Failed to cancel the ticket. Please try again.');
      }
    } catch (err) {
      console.error('Error cancelling ticket:', err.response?.data || err);
      setMessage(`An error occurred: ${err.response?.data?.error || 'Please try again.'}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-normal pt-20 min-h-screen  ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cancel Ticket</h2>

      <form onSubmit={handleCancel} className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Cancel Ticket
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-red-500 font-semibold">{message}</p>
      )}
    </div>
  );
}

export default CancelTicket; 
