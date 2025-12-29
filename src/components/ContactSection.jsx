import React from 'react'

const ContactSection = ({ className, showForm = true }) => {
  return (
    <section id="contact" className={className || "py-20  bg-green-900"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold tracking-wider uppercase text-sm">FUTO Support</span>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mt-2">Contact Management</h2>
          <p className="text-white mt-4 max-w-2xl mx-auto">
            Reach out to the Student Affairs Unit or ICT Centre for assistance with hostel allocation.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${showForm ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'} gap-12 max-w-6xl mx-auto`}>
          {/* Contact Info with Icons */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Student Affairs Unit</h3>
                <p className="text-white mt-1">Senate Building, FUTO<br/>PMB 1526, Owerri, Imo State</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Official Emails</h3>
                <p className="text-white mt-1">studentaffairs@futo.edu.ng<br/>helpdesk@futo.edu.ng</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Helplines</h3>
                <p className="text-white mt-1">Student Affairs: +234 803 000 0000<br/>Security Unit: +234 803 111 1111</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {showForm && (
            <form className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h1 className='text-xl font-bold mb-4 text-yellow-400'>SEND US A MESSAGE</h1>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition transform hover:scale-[1.02]">
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection