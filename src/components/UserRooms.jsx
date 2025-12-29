import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-900">Available Rooms</h2>
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

export default UserRooms;