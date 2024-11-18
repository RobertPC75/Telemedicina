import React from 'react'
import { Link } from 'react-router-dom'
import { Video, Calendar, FileText } from 'lucide-react'

const PaginaInicio: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a la Plataforma de Telemedicina</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/citas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Agendar Cita</h2>
          <p className="mt-2 text-gray-600 text-center">Programe una consulta virtual con un profesional de la salud.</p>
        </Link>
        <Link to="/consulta" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Video size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Iniciar Consulta</h2>
          <p className="mt-2 text-gray-600 text-center">Comience su consulta virtual con un médico.</p>
        </Link>
        <Link to="/historial-medico" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <FileText size={48} className="mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-center">Historial Médico</h2>
          <p className="mt-2 text-gray-600 text-center">Acceda y gestione su historial médico de forma segura.</p>
        </Link>
      </div>
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Acerca de la Plataforma de Telemedicina</h2>
        <p className="text-gray-700">
          Nuestra Plataforma de Telemedicina proporciona servicios de salud accesibles a pacientes en todo el país. 
          Conectamos a los pacientes con profesionales de la salud calificados para consultas virtuales, 
          facilitando más que nunca recibir asesoramiento médico y atención desde la comodidad de su hogar.
        </p>
      </div>
    </div>
  )
}

export default PaginaInicio