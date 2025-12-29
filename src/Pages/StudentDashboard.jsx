import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import useFetch from '../hooks/useFetch.js';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch User Profile
  const { data: userData, loading: userLoading, error: userError } = useFetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile');
  const userProfile = userData?.user || (userData?.email ? userData : null);
  const userName = userProfile?.fullname || '';

  // 2. Fetch Rooms (dependent on userProfile)
  const { data: roomData, loading: roomLoading, error: roomError } = useFetch(
    userProfile ? `https://hostel-management-system-backend-2o9z.onrender.com/api/rooms/available?gender=${userProfile.sex}` : null
  );
  const availableRooms = Array.isArray(roomData) ? roomData : [];

  // 3. Fetch Booking
  const { data: bookingData, loading: bookingLoading, error: bookingError } = useFetch(
    userProfile ? `https://hostel-management-system-backend-2o9z.onrender.com/api/bookings/mybookings/${userProfile._id || userProfile.id}` : null
  );
  // Handle booking data safely
  const booking = Array.isArray(bookingData) && bookingData.length > 0 ? bookingData[0] : null;

  // 4. Fetch All Rooms for Stats
  const { data: allRoomsData, loading: allRoomsLoading } = useFetch('https://hostel-management-system-backend-2o9z.onrender.com/api/rooms');
  const totalRooms = Array.isArray(allRoomsData) ? allRoomsData.length : 0;
  const totalAvailableRooms = Array.isArray(allRoomsData) ? allRoomsData.reduce((acc, room) => acc + (room.availableBunks > 0 ? 1 : 0), 0) : 0;

  const loading = userLoading || roomLoading || bookingLoading || allRoomsLoading;
  const error = userError || roomError || bookingError;

  const dashboardItems = [
    { title: "Total Rooms", value: totalRooms, border: "border-indigo-500" },
    { title: "Available Rooms", value: totalAvailableRooms, border: "border-blue-500" },
    { title: "Room Status", value: booking ? "Allocated" : "Not Allocated", border: "border-yellow-400" },
    { title: "Hostel Fee", value: booking ? "Paid" : "Pending", border: "border-green-500" },
    { title: "Maintenance", value: "No Requests", border: "border-blue-400" },
    { title: "Exeat Status", value: "Active", border: "border-purple-500" }
  ];

  const filteredItems = dashboardItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout onSearch={setSearchTerm}>
      <div className="p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64 space-x-2">
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-white rounded shadow">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Welcome Back{userName ? `, ${userName}` : ''}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div key={index} className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 ${item.border}`}>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold">{item.title}</h3>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-400 mt-2">{item.value}</p>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No results found.</p>
              )}
            </div>

            {!booking ? (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Available Rooms</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableRooms.length > 0 ? availableRooms.map(room => (
                      <div key={room._id || room.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-2">{room.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">Type: {room.type}</p>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">Available Bunks: {room.availableBunks !== undefined ? room.availableBunks : (room.available || 0)}</p>
                          <p className="text-gray-600 dark:text-gray-300">Price: ₦{room.price ? room.price.toLocaleString() : '0'}</p>
                          <Link to={`/room/${room._id || room.id}`} className="mt-4 inline-block bg-yellow-400 text-green-900 py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors">
                            View Details
                          </Link>
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-500 dark:text-gray-400">No available rooms found for your gender.</p>
                    )}
                  </div>
                </div>
            ) : (
              <div className="mt-10 text-center text-gray-500">
                <p>You have already booked a room. Check "My Allocation" for details.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;