import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600">
            Welcome to the Bus Ticket Booking System! Our platform allows students and staff
            of Sri Eshwar College of Engineering to easily book, view, and manage bus tickets
            for their daily commute.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            We aim to provide a seamless and user-friendly experience for managing bus bookings
            and cancellations, ensuring that students and staff can easily travel between
            the college and their home.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Easy ticket booking based on your preferred stop.</li>
            <li>Option to cancel tickets through a simple user interface.</li>
            <li>Admin panel for managing bus schedules and user bookings.</li>
            <li>Downloadable PDF tickets for easy access and record-keeping.</li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h3>
          <p className="text-gray-600">
            If you have any questions or feedback, feel free to reach out to us via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
