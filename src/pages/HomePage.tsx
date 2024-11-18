import React from 'react'
import { Link } from 'react-router-dom'
import { Video, Calendar, FileText } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Ontario Telemedicine</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/appointments" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Book Appointment</h2>
          <p className="mt-2 text-gray-600 text-center">Schedule a virtual consultation with a healthcare professional.</p>
        </Link>
        <Link to="/consultation" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Video size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Start Consultation</h2>
          <p className="mt-2 text-gray-600 text-center">Begin your virtual consultation with a doctor.</p>
        </Link>
        <Link to="/medical-records" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <FileText size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Medical Records</h2>
          <p className="mt-2 text-gray-600 text-center">Access and manage your medical records securely.</p>
        </Link>
      </div>
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">About Ontario Telemedicine</h2>
        <p className="text-gray-700">
          Ontario Telemedicine provides accessible healthcare services to residents across the province. 
          Our platform connects patients with qualified healthcare professionals for virtual consultations, 
          making it easier than ever to receive medical advice and care from the comfort of your home.
        </p>
      </div>
    </div>
  )
}

export default HomePage