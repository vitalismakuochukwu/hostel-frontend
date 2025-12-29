import React from 'react';

export default function AllocationResult({ allocation, onReset }) {
  if (!allocation) {
    return null;
  }

  const { student, hostel, date } = allocation;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-600 text-center">
      <div className="mb-6">
        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Allocation Successful!</h2>
      <p className="text-gray-600 mb-6">Congratulations, your room has been successfully allocated.</p>
      
      <div className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
        <p><strong className="font-medium text-gray-800">Student:</strong> {student.fullName}</p>
        <p><strong className="font-medium text-gray-800">Reg Number:</strong> {student.regNumber}</p>
        <p><strong className="font-medium text-gray-800">Hostel:</strong> {hostel.name}</p>
        <p><strong className="font-medium text-gray-800">Room Type:</strong> {hostel.type}</p>
        <p><strong className="font-medium text-gray-800">Date:</strong> {date}</p>
      </div>

      <button 
        onClick={onReset} 
        className="mt-8 w-full bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-800 transition font-bold"
      >
        Start New Allocation
      </button>
    </div>
  );
}