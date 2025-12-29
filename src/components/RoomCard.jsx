import React from 'react';

export default function RoomCard({ hostel, onAllocate, userGender }) {
  const isAvailable = hostel.available > 0;
  const isGenderMatch = hostel.gender === userGender;
  const canAllocate = isAvailable && isGenderMatch;

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${!canAllocate ? 'opacity-60 grayscale' : ''}`}>
      <img src={hostel.image} alt={hostel.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{hostel.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${hostel.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>{hostel.gender}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{hostel.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-700 font-bold">₦{hostel.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{hostel.available} spaces left</span>
        </div>
        <button onClick={() => onAllocate(hostel)} disabled={!canAllocate}
          className={`mt-3 w-full py-2 rounded text-sm font-medium ${canAllocate ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
          {isGenderMatch ? (isAvailable ? 'Allocate Room' : 'Fully Booked') : `Only for ${hostel.gender}s`}
        </button>
      </div>
    </div>
  );
}