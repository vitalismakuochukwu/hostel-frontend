import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    regnumber: '',
    email: '',
    password: '',
    department: '',
    sex: 'Male'
  });
  const [isVerification, setIsVerification] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: Code & New Password
  const [resetData, setResetData] = useState({ email: '', code: '', newPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
    return null;
  };

  const renderPasswordStrength = (password) => {
    if (!password) return null;
    let score = 0;
    if (password.length > 5) score++;
    if (password.length > 9) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const color = score < 3 ? 'bg-red-500' : score < 5 ? 'bg-yellow-500' : 'bg-green-500';
    const label = score < 3 ? 'Weak' : score < 5 ? 'Medium' : 'Strong';
    const width = Math.min(100, (score / 5) * 100);

    return (
      <div className="mt-1">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${width}%` }}></div>
        </div>
        <p className={`text-xs text-right mt-0.5 ${score < 3 ? 'text-red-500' : score < 5 ? 'text-yellow-600' : 'text-green-600'}`}>{label}</p>
      </div>
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup) {
      const error = validatePassword(formData.password);
      if (error) {
        alert(error);
        setIsLoading(false);
        return;
      }
    }

    const url = isSignup ? 'https://hostel-management-system-backend-2o9z.onrender.com/api/auth/register' : 'https://hostel-management-system-backend-2o9z.onrender.com/api/auth/login';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSignup ? formData : { email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignup) {
          // Show loading wave for 2 seconds before showing verification form
          setTimeout(() => {
            setIsLoading(false);
            setIsVerification(true); // Switch to verification mode
          }, 2000);
        } else {
          setIsLoading(false);
          localStorage.setItem('userId', data.user.id || data.user._id);
          localStorage.setItem('token', data.token);
          navigate('/profile');
        }
      } else {
        setIsLoading(false);
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      alert('Failed to connect to the server.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: activationCode.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account activated successfully! You can now log in.');
        setIsVerification(false);
        setIsSignup(false); // Switch to login view
      } else {
        alert(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server.');
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    if (!formData.email) {
      alert("Email address is missing. Please register again.");
      return;
    }
    try {
      const response = await fetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setResendTimer(60); // Start 60 second countdown
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resend code.');
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetData.email }),
      });
      const data = await response.json();
      setIsLoading(false);
      alert(data.message);
      if (data.success) setResetStep(2);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const error = validatePassword(resetData.newPassword);
    if (error) {
      alert(error);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://hostel-management-system-backend-2o9z.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetData.email,
          code: resetData.code.trim(),
          newPassword: resetData.newPassword
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      alert(data.message);
      if (data.success) setIsForgotPassword(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-t-4 border-yellow-400">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex space-x-2">
              <div className="h-5 w-5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
              <div className="h-5 w-5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
              <div className="h-5 w-5 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <p className="mt-6 text-green-900 font-bold text-lg">Processing Registration...</p>
          </div>
        ) : isVerification ? (
          <>
            <h2 className="text-center mb-6 text-green-900 text-2xl font-bold">VERIFY ACCOUNT</h2>
            <p className="text-center text-gray-600 mb-4">Enter the 6-digit code sent to {formData.email}</p>
            <form onSubmit={handleVerify}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Activation Code</label>
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" value={activationCode} onChange={(e) => setActivationCode(e.target.value)} required />
              </div>
              <button type="submit" className="w-full p-3 bg-yellow-400 text-green-900 rounded mt-4 hover:bg-yellow-300 transition duration-300 font-bold">Verify & Activate</button>
            </form>
            <div className="text-center mt-4">
              <button 
                onClick={handleResend} 
                type="button" 
                disabled={resendTimer > 0}
                className={`text-sm ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:underline cursor-pointer'} bg-transparent border-none`}
              >
                {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : 'Resend Code'}
              </button>
            </div>
          </>
        ) : isForgotPassword ? (
          <>
            <h2 className="text-center mb-6 text-green-900 text-2xl font-bold">RESET PASSWORD</h2>
            {resetStep === 1 ? (
              <form onSubmit={handleForgotRequest}>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600 font-medium">Enter your Email</label>
                  <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="email" value={resetData.email} onChange={(e) => setResetData({...resetData, email: e.target.value})} required />
                </div>
                <button type="submit" className="w-full p-3 bg-yellow-400 text-green-900 rounded mt-4 hover:bg-yellow-300 transition duration-300 font-bold">Send Reset Code</button>
              </form>
            ) : (
              <form onSubmit={handleForgotReset}>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600 font-medium">Reset Code</label>
                  <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" value={resetData.code} onChange={(e) => setResetData({...resetData, code: e.target.value})} required />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600 font-medium">New Password</label>
                  <div className="relative">
                    <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10" type={showResetPassword ? "text" : "password"} value={resetData.newPassword} onChange={(e) => setResetData({...resetData, newPassword: e.target.value})} required />
                    <button type="button" onClick={() => setShowResetPassword(!showResetPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                      {showResetPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                  {renderPasswordStrength(resetData.newPassword)}
                </div>
                <button type="submit" className="w-full p-3 bg-yellow-400 text-green-900 rounded mt-4 hover:bg-yellow-300 transition duration-300 font-bold">Reset Password</button>
              </form>
            )}
            <div className="text-center mt-4">
              <button onClick={() => { setIsForgotPassword(false); setResetStep(1); }} type="button" className="text-sm text-green-700 hover:underline bg-transparent border-none cursor-pointer">
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
        <h2 className="text-center mb-6 text-green-900 text-2xl font-bold">{isSignup ? 'REGISTER NOW' : 'SIGN IN'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Full Name</label>
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Reg Number</label>
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" name="regnumber" value={formData.regnumber} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Department</label>
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-600 font-medium">Sex</label>
                <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-medium">Email</label>
            <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-medium">Password</label>
            <div className="relative">              
              <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            {isSignup && renderPasswordStrength(formData.password)}
            {!isSignup && (
              <div className="text-right mt-1">
                <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-green-700 hover:underline bg-transparent border-none cursor-pointer">Forgot Password?</button>
              </div>
            )}
          </div>
          <button type="submit" className="w-full p-3 bg-yellow-400 text-green-900 rounded mt-4 hover:bg-yellow-300 transition duration-300 font-bold">
            {isSignup ? 'Register' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6">
          <button className="text-green-700 text-sm underline hover:text-yellow-600 bg-transparent border-none cursor-pointer" onClick={switchMode} type="button">
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;