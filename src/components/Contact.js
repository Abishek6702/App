import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// Importing social media icons from react-icons
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the message to your team (or email recipient)
    emailjs.sendForm(
      'service_xw7dp0m',  // Replace with your EmailJS service ID
      'template_qb1edt7',  // Replace with your original template ID (message to your team)
      e.target,  // The form element itself
      'GY1zS0UdC3wtdngQW'  // Replace with your EmailJS user ID
    ).then((result) => {
      console.log('Email sent successfully:', result.text);

      // After sending to your team, send the auto-reply to the user
      emailjs.sendForm(
        'service_xw7dp0m',  // Same service ID
        'template_6gt7n56',  // Replace with the auto-reply template ID
        e.target,  // The form element
        'GY1zS0UdC3wtdngQW'  // Replace with your EmailJS user ID
      ).then((result) => {
        console.log('Auto-reply sent to user:', result.text);
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }).catch((error) => {
        console.log('Error sending auto-reply email:', error.text);
        alert('Oops! Something went wrong while sending the confirmation email.');
      });

    }).catch((error) => {
      console.log('Error sending email:', error.text);
      alert('Oops! Something went wrong. Please try again later.');
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-6">
      {/* Left side (address and social links) */}
      <div className="lg:w-1/2 p-6 flex flex-col items-center space-y-6 pt-7">
        <h2 className="text-xl font-semibold text-gray-700">Our Address</h2>
        <p className="text-gray-600">Sri Eshwar College of Engineering</p>
        <p className="text-gray-600">Coimbatore, Tamil Nadu, India</p>

        <h3 className="text-xl font-semibold text-gray-700 mt-8">Follow Us</h3>
        <div className="flex space-x-6 mt-4">
          <a
            href="https://www.youtube.com/channel/UC77zVLSva6lRY6eqaDFUkuA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-red-500 transition duration-300"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://x.com/srieshwar_cbe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition duration-300"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.instagram.com/srieshwar_cbe/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-500 transition duration-300"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.linkedin.com/school/srieshwar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 transition duration-300"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>

      {/* Right side (form) */}
      <div className="lg:w-1/2 p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg space-y-4"
        >
          <input
            type="text"
            name="name"  // Name must match template placeholder
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"  // Email must match template placeholder
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            name="message"  // Message must match template placeholder
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
