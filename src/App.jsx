
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import AboutUs from './components/AboutUs'
import Home from './Pages/Home'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import AuthForm from './Pages/AuthForm.jsx'
import VerifyEmail from './Pages/VerifyEmail.jsx'
import StudentDashboard from './Pages/StudentDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import RoomAllocation from './Pages/RoomAllocation'
import DashboardLayout from './components/DashboardLayout'
import RoomDetails from './Pages/RoomDetails'
import Rooms from './components/Rooms.jsx'
import Payment from './Pages/Payment.jsx'

function App() {
  const location = useLocation();
  const isDashboard = ['/dashboard', '/profile', '/settings', '/room-allocation', '/rooms'].includes(location.pathname);

  return (
    <div>
      {!isDashboard && <Navbar />}
      {/* <AboutUs/> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/rooms" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Rooms />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AuthForm" element={<AuthForm />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/room-allocation" 
          element={
            <ProtectedRoute>
              <RoomAllocation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/room/:id" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <RoomDetails />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* <Route path="/student-portal" element={<StudentPortal />} /> */}
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  )
}

export default App