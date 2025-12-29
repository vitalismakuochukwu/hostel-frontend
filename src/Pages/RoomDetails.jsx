import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [bunkStatuses, setBunkStatuses] = useState({});

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`https://hostel-management-system-backend-2o9z.onrender.com/api/rooms/${id}`);
        setRoom(res.data);

        // Fetch bunk statuses
        const bookingRes = await axios.get(`https://hostel-management-system-backend-2o9z.onrender.com/api/bookings/room/${id}`);
        const statusMap = {};
        bookingRes.data.forEach(b => {
          statusMap[b.bunkNumber] = b.status;
        });
        setBunkStatuses(statusMap);

      } catch (err) {
        console.error("Error fetching room", err);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBunkSelection = async (number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
         alert("Please log in to book a room");
         navigate('/AuthForm');
         return;
      }
      
      // Before paying, we send the intent to the backend
      const bookingData = {
        roomId: id,              // Ensure your Backend Model uses "room" or "roomId"
        userId: userId,          // Added userId to match backend requirement
        bunkNumber: number,  // Must be named 'bunkNumber' to match backend
        amount: room.price        // Or whatever your price is
      };

      const res = await axios.post('https://hostel-management-system-backend-2o9z.onrender.com/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // If successful, go to payment
      // The backend returns { message, booking }
      const bookingId = res.data.booking ? res.data.booking._id : res.data._id;
      navigate('/payment', { 
        state: { 
          bookingId: bookingId, 
          amount: room.price,
          rrr: res.data.booking.rrr, 
          expiresAt: res.data.booking.expiresAt 
        } 
      });
      
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err.message);
      console.error("Selection failed:", err.response?.data);
    }
  };

  if (!room) return <div className="p-10 text-center">Loading Room Layout...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select a Space in {room.name}</h2>
      
      {/* The 4 Bunks Visual */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((bunkNum) => {
          const status = bunkStatuses ? bunkStatuses[bunkNum] : null;
          const isReserved = status === 'Reserved';
          const isConfirmed = status === 'Confirmed';
          const isAvailable = !status;

          let bgClass = 'bg-white border-green-500 hover:bg-green-50 cursor-pointer';
          let text = 'Available';
          
          if (isReserved) {
            bgClass = 'bg-yellow-100 border-yellow-500 cursor-not-allowed';
            text = 'Reserved (Payment Pending)';
          } else if (isConfirmed) {
            bgClass = 'bg-gray-200 border-gray-400 cursor-not-allowed opacity-70';
            text = 'Occupied';
          }

          return (
            <div 
              key={bunkNum}
              onClick={() => isAvailable && handleBunkSelection(bunkNum)}
              className={`border-2 p-8 rounded-lg text-center transition-colors ${bgClass}`}
            >
              <h3 className="font-bold text-lg">Bunk {bunkNum}</h3>
              <p className="text-sm text-gray-600 font-medium">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomDetails;