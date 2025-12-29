import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import AllocationResult from './AllocationResult';
import AboutUs from '../components/AboutUs';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import useFetch from '../hooks/useFetch.js';

export default function Home() {
  const [hostels, setHostels] = useState([]);
  const [user, setUser] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { data: roomData, loading: roomsLoading } = useFetch('https://hostel-management-system-backend-2o9z.onrender.com/api/rooms/available');

  useEffect(() => {
    // When room data is fetched, update the local hostels state
    if (roomData?.rooms) {
      setHostels(roomData.rooms);
    }
  }, [roomData]);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleAllocation = (selectedHostel) => {
    const availableCount = selectedHostel.availableBunks !== undefined ? selectedHostel.availableBunks : selectedHostel.available;
    if (availableCount > 0) {
      const updatedHostels = hostels.map(h => 
        (h._id || h.id) === (selectedHostel._id || selectedHostel.id) ? { ...h, availableBunks: availableCount - 1 } : h
      );
      setHostels(updatedHostels);
      
      setAllocation({
        student: user,
        hostel: selectedHostel,
        date: new Date().toLocaleDateString()
      });
    }
  };

  const resetSystem = () => {
    setUser(null);
    setAllocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <>
          <Hero />
          <AboutUs />

          {/* Contact Popup Widget */}
          {isContactOpen && (
            <div className="fixed bottom-24 right-4 md:right-8 w-full md:w-[450px] max-h-[80vh] bg-green-900 shadow-2xl rounded-2xl z-50 overflow-y-auto border border-green-700">
              <ContactSection className="py-8 bg-green-900" showForm={false} />
            </div>
          )}

          {/* Floating Contact Icon */}
          <button 
            onClick={() => setIsContactOpen(!isContactOpen)} 
            className="fixed bottom-8 right-8 bg-yellow-400 text-green-900 p-4 rounded-full shadow-2xl hover:bg-yellow-300 transition-all transform hover:scale-110 z-50 flex items-center justify-center border-2 border-green-900"
          >
            {isContactOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            )}
          </button>

    
        </>
      ) : !allocation ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Available Hostels</h2>
              <p className="text-gray-600">Welcome, {user.fullName} ({user.gender})</p>
            </div>
            <button onClick={() => setUser(null)} className="text-sm text-red-600 hover:underline">Cancel</button>
          </div>
        {roomsLoading ? (
          <div className="flex justify-center items-center h-64 space-x-2">
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {hostels.map(hostel => (
              <RoomCard key={hostel._id || hostel.id} hostel={hostel} userGender={user.gender} onAllocate={handleAllocation} />
            ))}
          </div>
        )}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <AllocationResult allocation={allocation} onReset={resetSystem} />
        </div>
      )}

    </div>
  );
}