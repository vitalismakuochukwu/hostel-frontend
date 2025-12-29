import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [existingBooking, setExistingBooking] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let genderQuery = '';
        const token = localStorage.getItem('token');

        // If user is logged in, fetch profile to get gender
        if (token) {
          try {
            // 1. Fetch Profile
            const profileRes = await axios.get('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (profileRes.data && profileRes.data.sex) {
              genderQuery = `?gender=${profileRes.data.sex}`;
              setUserGender(profileRes.data.sex);
            }

            // 2. Check for Existing Booking
            const bookingRes = await axios.get(`https://hostel-management-system-backend-2o9z.onrender.com/api/bookings/mybookings/${profileRes.data._id}`, {
               headers: { Authorization: `Bearer ${token}` }
            });
            if (bookingRes.data && bookingRes.data.length > 0) {
              setExistingBooking(bookingRes.data[0]);
            }
          } catch (err) {
            console.error("Error fetching user profile:", err);
          }
        }

        const res = await axios.get(`https://hostel-management-system-backend-2o9z.onrender.com/api/rooms${genderQuery}`);
        setRooms(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []); // 👈 IMPORTANT: Empty array means "run only once on mount"

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  // If user has a booking, show receipt instead of room list
  if (existingBooking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-green-200">
          <div className="bg-green-900 p-6 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold">Booking Confirmed</h2>
            <span className="bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {existingBooking.status}
            </span>
          </div>
          <div className="p-8 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mt-4">You have already booked a room!</h3>
              <p className="text-gray-600 mt-2">You cannot book another room while you have an active reservation.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto border border-gray-200">
              <p className="flex justify-between mb-2"><span className="text-gray-600">Room:</span> <span className="font-bold">{existingBooking.room?.name || 'Allocated Room'}</span></p>
              <p className="flex justify-between mb-2"><span className="text-gray-600">Bunk:</span> <span className="font-bold">{existingBooking.bunkNumber}</span></p>
              <p className="flex justify-between mb-2"><span className="text-gray-600">Amount:</span> <span className="font-bold">₦{existingBooking.amount?.toLocaleString()}</span></p>
              {existingBooking.rrr && <p className="flex justify-between mt-4 pt-4 border-t border-gray-200"><span className="text-gray-600">RRR:</span> <span className="font-mono font-bold text-green-700">{existingBooking.rrr}</span></p>}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link to="/dashboard" className="bg-green-900 text-white px-6 py-2 rounded hover:bg-green-800 transition">Go to Dashboard</Link>
              <button onClick={() => window.print()} className="bg-yellow-400 text-green-900 px-6 py-2 rounded hover:bg-yellow-300 transition font-bold">Print Receipt</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the list of rooms
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-green-900">Available Rooms</h2>
      {userGender && (
        <p className="text-center text-gray-600 mb-8">Showing rooms for: <span className="font-bold">{userGender}</span></p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <img 
              src={room.image || 'https://via.placeholder.com/300'} 
              alt={room.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{room.hostel || 'Hostel'}</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{room.type}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${room.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 'bg-indigo-100 text-indigo-800'}`}>{room.gender}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-900">₦{room.price?.toLocaleString()}</span>
                <Link to={`/room/${room._id}`} className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-bold hover:bg-yellow-300 transition">
                  View Details
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">{room.availableBunks} bunks left</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;