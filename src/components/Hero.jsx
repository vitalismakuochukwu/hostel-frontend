import React from 'react';
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
const Hero = () => {
  return (
    <div className="relative bg-green-200 h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="FUTO Hostel Building"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-900/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <span className="text-yellow-400 font-bold tracking-widest uppercase mb-4 text-sm md:text-base animate-fade-in">
          Official Student Accommodation
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          Live Comfortably, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Study Effectively
          </span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
          Secure your space in the Federal University of Technology Owerri hostels. 
          Experience a safe, conducive, and vibrant student community right on campus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/rooms"
            className="px-8 py-4 bg-yellow-500 text-green-900 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg text-center"
          >
            Book a Room
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-green-900 transition-all transform hover:scale-105 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;