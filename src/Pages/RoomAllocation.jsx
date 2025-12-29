import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import useFetch from '../hooks/useFetch.js';

const RoomAllocation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch User Profile
  const { data: userData, loading: userLoading } = useFetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile');
  
  const userProfile = userData?.user || (userData?.email ? userData : null);

  // 2. Fetch Rooms (dependent on userProfile)
  const { data: roomData, loading: roomLoading, error: roomError } = useFetch( 
    userProfile ? `https://hostel-management-system-backend-2o9z.onrender.com/api/rooms/available?gender=${userProfile.sex || 'Male'}` : null
  );

  const rooms = roomData?.rooms || [];
  const loading = userLoading || roomLoading;

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout onSearch={setSearchTerm}>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Room Allocation</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Select and book your preferred accommodation.</p>

        {roomError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{roomError}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64 space-x-2">
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredRooms.length > 0 ? filteredRooms.map(room => (
              <div key={room._id || room.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4 border-green-600 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{room.name}</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase">{room.type}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Available Spaces: <span className="font-medium">{room.availableBunks !== undefined ? room.availableBunks : (room.available || 0)}</span></p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Price: <span className="font-medium">₦{room.price ? room.price.toLocaleString() : '0'}</span></p>
                  <div className="flex justify-end items-center mt-4">
                    <Link to={`/room/${room._id || room.id}`} className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors w-full text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">No rooms available for your gender ({userProfile?.sex}) at the moment.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RoomAllocation;