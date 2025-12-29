import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-8 border-t-4 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">FUTO <span className="text-yellow-400">Hostels</span></h3>
            <p className="text-gray-300 leading-relaxed">
              Providing safe, comfortable, and conducive accommodation for the students of the Federal University of Technology Owerri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
              <li><Link to="/rooms" className="hover:text-yellow-300 transition">Book a Room</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-yellow-400">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>PMB 1526, Owerri, Imo State</li>
              <li>support@futohostels.com</li>
              <li>+234 800 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Federal University of Technology Owerri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;