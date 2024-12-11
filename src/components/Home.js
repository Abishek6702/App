import React from 'react';

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Bus Ticket Booking System</h1>
        <p className="text-lg">Your easy solution for booking bus tickets at Sri Eshwar College of Engineering</p>
      </header>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Key Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-item text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Book Tickets Easily</h3>
            <p className="text-gray-600">Book bus tickets based on your preferred stopping point and availability.</p>
          </div>
          <div className="feature-item text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Cancel Tickets</h3>
            <p className="text-gray-600">Cancel any unwanted bookings with just a few clicks.</p>
          </div>
          <div className="feature-item text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Download PDF Tickets</h3>
            <p className="text-gray-600">Download your bus ticket as a PDF for easy access and record-keeping.</p>
          </div>
        </div>
      </section>

      <section className="cta bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Book?</h2>
        <p className="text-lg mb-6">Get started by booking your first ticket today!</p>
        <button 
          onClick={() => window.location.href = '/book-ticket'}
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Book Ticket
        </button>
      </section>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Sri Eshwar College of Engineering</p>
      </footer>
    </div>
  );
}

export default Home;
