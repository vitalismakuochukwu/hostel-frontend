import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            FUTO <span className="text-yellow-400">Hostels</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-yellow-300 transition font-medium">Home</Link>
            <Link to="/rooms" className="hover:text-yellow-300 transition font-medium">Book Room</Link>
            <Link to="/about" className="hover:text-yellow-300 transition font-medium">About Us</Link>
            <Link to="/services" className="hover:text-yellow-300 transition font-medium">Services</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition font-medium">Contact</Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition">Dashboard</Link>
              </>
            ) : (
              <Link to="/AuthForm" className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition">
                Student Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-yellow-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-green-700 mt-2 pt-2">
            <Link to="/" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/rooms" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Book Room</Link>
            <Link to="/about" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/services" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Contact</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Profile</Link>
                <Link to="/dashboard" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
              </>
            ) : (
              <Link to="/AuthForm" className="block py-2 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Student Portal</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}