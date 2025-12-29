// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: '',
//     department: '',
//     sex: ''
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(res.data);
//       setFormData({
//         fullname: res.data.fullname,
//         department: res.data.department,
//         sex: res.data.sex
//       });
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(res.data);
//       setIsEditing(false);
//       alert('Profile updated successfully!');
//     } catch (err) {
//       alert('Failed to update profile');
//     }
//   };

//   if (loading) return <div className="p-8 text-center">Loading Profile...</div>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-green-900 p-6 text-white flex justify-between items-center">
//           <h2 className="text-2xl font-bold">My Profile</h2>
//           {!isEditing && (
//             <button 
//               onClick={() => setIsEditing(true)}
//               className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-bold hover:bg-yellow-300 transition"
//             >
//               Update Profile
//             </button>
//           )}
//         </div>
        
//         <div className="p-6">
//           {isEditing ? (
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-bold mb-2">Full Name</label>
//                 <input 
//                   type="text" 
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
//                   value={formData.fullname}
//                   onChange={(e) => setFormData({...formData, fullname: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-bold mb-2">Department</label>
//                 <input 
//                   type="text" 
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
//                   value={formData.department}
//                   onChange={(e) => setFormData({...formData, department: e.target.value})}
//                 />
//               </div>
//               <div className="flex space-x-4 pt-4">
//                 <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-400">Cancel</button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               <div className="border-b pb-3">
//                 <p className="text-sm text-gray-500">Full Name</p>
//                 <p className="text-lg font-medium text-gray-900">{user.fullname}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <p className="text-sm text-gray-500">Reg Number</p>
//                 <p className="text-lg font-medium text-gray-900">{user.regnumber}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <p className="text-sm text-gray-500">Department</p>
//                 <p className="text-lg font-medium text-gray-900">{user.department}</p>
//               </div>
//               <div className="border-b pb-3">
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="text-lg font-medium text-gray-900">{user.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Gender</p>
//                 <p className="text-lg font-medium text-gray-900">{user.sex}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    department: '',
    sex: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setFormData({
        fullname: res.data.fullname,
        department: res.data.department,
        sex: res.data.sex
      });
      setLoading(false);
    } catch (err) {
      console.error("Fetch Profile Error:", err);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const { oldPassword, newPassword } = passwordData;
      const res = await axios.post(
        'https://hostel-management-system-backend-2o9z.onrender.com/api/auth/change-password', 
        { oldPassword, newPassword }, // Make sure these match the backend names
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setIsChangingPassword(false);
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      console.error("Change Password Error:", err);
      // Handle cases where response might not be JSON (e.g., 404 HTML page)
      const msg = err.response?.data?.message 
        ? err.response.data.message 
        : 'Failed to change password. Please check your connection or try again.';
      alert(msg);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Profile...</div>;

  // Final check: If loading is finished but user is still null (due to a 500 error)
  if (!user && !loading) return <div className="p-8 text-center text-red-600">Error loading user data. Please log in again.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-900 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Profile</h2>
          {!isEditing && !isChangingPassword && (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-bold hover:bg-yellow-300 transition"
              >
                Update Profile
              </button>
              <button 
                onClick={() => setIsChangingPassword(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 transition"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.fullname}
                  onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Department</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-400">Cancel</button>
              </div>
            </form>
          ) : isChangingPassword ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Current Password</label>
                <input 
                  type="password" 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">New Password</label>
                <input 
                  type="password" 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Update Password</button>
                <button type="button" onClick={() => setIsChangingPassword(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-400">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Full Name</p>
                {/* Optional chaining applied below */}
                <p className="text-lg font-medium text-gray-900">{user?.fullname || "N/A"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Reg Number</p>
                <p className="text-lg font-medium text-gray-900">{user?.regnumber || "N/A"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-lg font-medium text-gray-900">{user?.department || "N/A"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-900">{user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-medium text-gray-900">{user?.sex || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;