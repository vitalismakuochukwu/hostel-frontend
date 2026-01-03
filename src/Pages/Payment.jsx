// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingId, amount, rrr, expiresAt } = location.state || {};
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Replace with your actual Paystack Public Key
//   const publicKey = 'pk_live_5f4795138121fbd707356a40a66cdd5de83bc05d'; 

//   // Load Paystack Script dynamically to avoid 'react-paystack' dependency issues
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch User Profile for Receipt
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching user details", err);
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const onSuccess = async (reference) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('https://hostel-management-system-backend-2o9z.onrender.com/api/bookings/verify', {
//         bookingId,
//         reference: reference.reference
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       alert("Payment Successful! Room Confirmed.");
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//       alert("Payment verified but server update failed. Contact admin.");
//     }
//   };

//   const onClose = () => {
//     alert("Payment cancelled.");
//   };

//   const handleDownloadReceipt = () => {
//     window.print();
//   };

// const handlePayment = () => {
//     if (!window.PaystackPop) {
//       alert("Payment system is still loading. Please wait a second.");
//       return;
//     }
    
//     // Ensure we use the actual student's email from the 'user' state
//     const studentEmail = user?.email || "student@example.com";

//     const handler = window.PaystackPop.setup({
//       // 1. Ensure 'publicKey' variable at the top of your file is set to 'pk_live_...'
//       key: publicKey, 
//       email: studentEmail,
//       amount: amount * 100, // Converts Naira to Kobo
//       ref: `REF-${new Date().getTime()}`, // Unique reference ID
//       callback: function(response) {
//         // This runs after the student successfully pays
//         onSuccess(response);
//       },
//       onClose: () => {
//         alert("Transaction was not completed.");
//       }
//     });

//     handler.openIframe();
//   };
//   if (!bookingId || !amount) {
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-xl text-red-600">Invalid Payment Session</h2>
//         <button onClick={() => navigate('/dashboard')} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">Go to Dashboard</button>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="flex space-x-2">
//           <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//           <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//           <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <style>
//         {`
//           @media print {
//             body * { visibility: hidden; }
//             .print-area, .print-area * { visibility: visible; }
//             .print-area { position: absolute; left: 0; top: 0; width: 100%; }
//             .no-print { display: none !important; }
//             .bg-gray-100 { background-color: white !important; }
//             .shadow-xl { box-shadow: none !important; }
//           }
//         `}
//       </style>
//       <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center print-area">
//         <h2 className="text-2xl font-bold text-green-900 mb-2">Payment Receipt</h2>
//         <p className="text-gray-600 mb-6">You are about to pay for your hostel accommodation.</p>
        
//         {user && (
//           <div className="bg-gray-50 p-4 rounded mb-6 text-left border border-gray-200">
//             <h3 className="font-bold text-gray-700 mb-2 border-b pb-1">Customer Information</h3>
//             <div className="space-y-1">
//               <p className="text-sm text-gray-600 flex justify-between"><span>Name:</span> <span className="font-medium text-gray-800">{user.fullname}</span></p>
//               <p className="text-sm text-gray-600 flex justify-between"><span>Email:</span> <span className="font-medium text-gray-800">{user.email}</span></p>
//               <p className="text-sm text-gray-600 flex justify-between"><span>Reg No:</span> <span className="font-medium text-gray-800">{user.regnumber}</span></p>
//             </div>
//           </div>
//         )}

//         <div className="bg-green-50 p-4 rounded mb-6">
//           <p className="text-sm text-gray-500">Amount to Pay</p>
//           <p className="text-3xl font-bold text-green-700">₦{amount.toLocaleString()}</p>
//         </div>

//         {rrr && (
//           <div className="bg-yellow-50 p-4 rounded mb-6 border border-yellow-200">
//             <p className="text-sm text-gray-600 font-bold uppercase">Remita Retrieval Reference (RRR)</p>
//             <p className="text-2xl font-mono font-bold text-gray-800 tracking-widest my-2">{rrr}</p>
//             <p className="text-xs text-red-600">
//               Expires: {new Date(expiresAt).toLocaleString()}
//             </p>
//             <p className="text-xs text-gray-500 mt-2">Use this RRR to make payment at any bank or via Remita.</p>
//           </div>
//         )}

//         {rrr && (
//           <button 
//             onClick={handleDownloadReceipt}
//             className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition shadow-md mb-3 flex items-center justify-center no-print"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
//             Download Remita Receipt
//           </button>
//         )}

//         <button 
//           onClick={handlePayment}
//           className="w-full bg-yellow-400 text-green-900 font-bold py-3 px-4 rounded hover:bg-yellow-300 transition shadow-md no-print"
//         >
//           Complete Payment Online
//         </button>
        
//         <button onClick={() => navigate(-1)} className="mt-4 text-sm text-gray-500 hover:text-gray-700 no-print">Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default Payment;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount, rrr, expiresAt } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LIVE PUBLIC KEY
  const publicKey = 'pk_live_5f4795138121fbd707356a40a66cdd5de83bc05d'; 

  // Load Paystack Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch User Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details", err);
        setLoading(false);
      }
    };
    if (bookingId) fetchUser();
  }, [bookingId]);

  const onSuccess = async (reference) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://hostel-management-system-backend-2o9z.onrender.com/api/bookings/verify', {
        bookingId,
        reference: reference.reference
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Payment Successful! Room Confirmed.");
      navigate('/dashboard');
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Payment successful on Paystack, but failed to update our server. Please save your receipt and contact admin.");
    }
  };

  const onClose = () => {
    alert("Transaction cancelled.");
  };

  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert("Payment system is still loading. Please wait a second.");
      return;
    }
    
    // Dynamic email from user profile
    const studentEmail = user?.email || "student@example.com";

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: studentEmail,
      amount: amount * 100, // Naira to Kobo
      ref: `HOSTEL-${new Date().getTime()}`, 
      callback: function(response) {
        onSuccess(response);
      },
      onClose: onClose
    });

    handler.openIframe();
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  if (!bookingId || !amount) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl text-red-600">Invalid Payment Session</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">Go to Dashboard</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; }
            .no-print { display: none !important; }
          }
        `}
      </style>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center print-area">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Payment Portal</h2>
        <p className="text-gray-600 mb-6">Hostel Accommodation Payment</p>
        
        {user && (
          <div className="bg-gray-50 p-4 rounded mb-6 text-left border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2 border-b pb-1 text-xs uppercase">Student Details</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 flex justify-between"><span>Name:</span> <span className="font-medium text-gray-800">{user.fullname}</span></p>
              <p className="text-sm text-gray-600 flex justify-between"><span>Email:</span> <span className="font-medium text-gray-800">{user.email}</span></p>
              <p className="text-sm text-gray-600 flex justify-between"><span>Reg No:</span> <span className="font-medium text-gray-800">{user.regnumber}</span></p>
            </div>
          </div>
        )}

        <div className="bg-green-50 p-4 rounded mb-6 border border-green-100">
          <p className="text-sm text-gray-500">Total Payable</p>
          <p className="text-3xl font-bold text-green-700">₦{amount.toLocaleString()}</p>
        </div>

        {rrr && (
          <div className="bg-yellow-50 p-4 rounded mb-6 border border-yellow-200">
            <p className="text-sm text-gray-600 font-bold uppercase">Remita RRR</p>
            <p className="text-2xl font-mono font-bold text-gray-800 tracking-widest my-2">{rrr}</p>
            <p className="text-xs text-red-600">Expires: {new Date(expiresAt).toLocaleDateString()}</p>
          </div>
        )}

        <div className="space-y-3 no-print">
          <button 
            onClick={handlePayment}
            className="w-full bg-green-700 text-white font-bold py-4 px-4 rounded hover:bg-green-800 transition shadow-lg"
          >
            Pay Now with Paystack
          </button>

          {rrr && (
            <button 
              onClick={handleDownloadReceipt}
              className="w-full bg-white text-gray-700 border border-gray-300 font-bold py-3 px-4 rounded hover:bg-gray-50 transition"
            >
              Print Remita Slip
            </button>
          )}
          
          <button onClick={() => navigate(-1)} className="w-full text-sm text-gray-400 hover:text-gray-600 py-2">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;