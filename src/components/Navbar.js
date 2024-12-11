import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaTicketAlt, 
  FaClipboard, 
  FaInfoCircle, 
  FaPhoneAlt, 
  FaUserShield 
} from 'react-icons/fa';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="" alt="Logo" className="w-20 h-10" />
          {/*<h1 className="text-2xl font-semibold">TickB</h1>*/}
        </div>

        {/* Navigation Links for Desktop */}
        <ul className="hidden lg:flex space-x-4">
          <li>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaHome size={20} className="mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/book-ticket"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaTicketAlt size={20} className="mr-2" />
              <span>Book Ticket</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cancel-ticket"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaClipboard size={20} className="mr-2" />
              <span>Cancel Ticket</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaInfoCircle size={20} className="mr-2" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaPhoneAlt size={20} className="mr-2" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
            >
              <FaUserShield size={20} className="mr-2" />
              <span>Admin</span>
            </Link>
          </li>
        </ul>

        {/* Mobile & Tablet Menu Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <ul className="bg-blue-700 space-y-4 py-4 text-center lg:hidden">
          <li>
            <Link
              to="/"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/book-ticket"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Book Ticket
            </Link>
          </li>
          <li>
            <Link
              to="/cancel-ticket"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Cancel Ticket
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="block text-white hover:bg-blue-500 py-2 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Admin
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
