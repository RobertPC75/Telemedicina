import React from 'react'
import { Video } from 'lucide-react'

const PaginaConsulta: React.FC = () => {

  const handleStartMeeting = () => {
    // Redirect to Zoom app (ensure it is placed in the correct location in your public folder)
    window.location.href = "/zoom-app/index.html";  // Adjust this path if necessary
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Video className="mr-2" /> Consulta por Video
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Iniciar Consulta Virtual</h2>
          <p className="text-gray-600 mb-6">
            Haga clic en el botón de abajo para unirse a la consulta por video con su médico.
          </p>
          <button
            onClick={handleStartMeeting}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            <Video className="mr-2" />
            Unirse a la Consulta
          </button>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Notas de la Consulta</h2>
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Escriba sus notas aquí..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaginaConsulta
