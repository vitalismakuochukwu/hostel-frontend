import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <div className="bg-green-900 py-16">
        <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center">About Us</h3>
        <p className="text-white text-center leading-relaxed max-w-3xl mx-auto px-4 text-lg">
          Welcome to the Federal University of Technology Owerri (FUTO) Hostel Allocation Portal. This platform is designed to facilitate a seamless and transparent accommodation booking process for all eligible students. Our goal is to ensure fair distribution of hostel spaces and provide a comfortable living environment conducive to academic excellence.
        </p>
        
        <div className="container mx-auto px-4 mt-12 mb-12">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-green-800 p-8 rounded-lg shadow-xl border border-green-700">
              <h4 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission</h4>
              <p className="text-gray-200 leading-relaxed">
                To provide a safe, secure, and conducive living environment that supports the academic and social development of every student. We are committed to maintaining high standards of hygiene and facility management to ensure your stay on campus is memorable and productive.
              </p>
            </div>
            <div className="bg-green-800 p-8 rounded-lg shadow-xl border border-green-700">
              <h4 className="text-2xl font-bold text-yellow-400 mb-4">Hostel Facilities</h4>
              <ul className="text-gray-200 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Reliable Water & Power Supply
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Common Rooms with TV & Indoor Games
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Reading Rooms & Study Areas
                </li>
                  <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Free Wifi
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Kitchenettes & Laundry Areas
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border-b-4 border-yellow-400 transform hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-green-900 mb-2">Easy Allocation</h4>
            <p className="text-gray-600">Automated and transparent room allocation system designed for speed and fairness.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border-b-4 border-yellow-400 transform hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-green-900 mb-2">Secure Living</h4>
            <p className="text-gray-600">24/7 security and monitored hostel environments to ensure student safety.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border-b-4 border-yellow-400 transform hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-green-900 mb-2">Conducive</h4>
            <p className="text-gray-600">Modern facilities designed specifically to support your academic success and comfort.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs