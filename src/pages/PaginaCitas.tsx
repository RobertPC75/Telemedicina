import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

interface Doctor {
  id_medico: number;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  especializacion: string;
  cedula: string;
}

interface Cita {
  id_cita: number;
  cedula_paciente: string;
  cedula_medico: string;
  fecha: string;
  hora: string;
  estado: string;
  doctor?: Doctor;
}

const PaginaCitas: React.FC = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('')
  const [horaSeleccionada, setHoraSeleccionada] = useState('')
  const [especializacionSeleccionada, setEspecializacionSeleccionada] = useState('')
  const [doctorSeleccionado, setDoctorSeleccionado] = useState('')
  const [especializaciones, setEspecializaciones] = useState<string[]>([])
  const [doctores, setDoctores] = useState<Doctor[]>([])
  const [doctoresFiltrados, setDoctoresFiltrados] = useState<Doctor[]>([])
  const [citasPaciente, setCitasPaciente] = useState<Cita[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEspecializaciones = async () => {
      try {
        const response = await fetch('https://telemedicina-api.onrender.com/api/especializaciones');
        if (!response.ok) {
          throw new Error('Error al obtener las especializaciones');
        }
        const data = await response.json();
        setEspecializaciones(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar las especializaciones');
      }
    };

    const fetchDoctores = async () => {
      try {
        const response = await fetch('https://telemedicina-api.onrender.com/api/medicos');
        if (!response.ok) {
          throw new Error('Error al obtener los doctores');
        }
        const data = await response.json();
        setDoctores(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los doctores');
      }
    };

    const fetchCitasPaciente = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.cedula) {
        try {
          const response = await fetch(`https://telemedicina-api.onrender.com/api/citas/paciente/${user.cedula}`);
          if (!response.ok) {
            throw new Error('Error al obtener las citas del paciente');
          }
          const data = await response.json();
          
          // Fetch doctor information for each appointment
          const citasConDoctores = await Promise.all(data.map(async (cita: Cita) => {
            const doctorResponse = await fetch(`https://telemedicina-api.onrender.com/api/medico/cedula/${cita.cedula_medico}`);
            if (doctorResponse.ok) {
              const doctorData = await doctorResponse.json();
              return { ...cita, doctor: doctorData };
            }
            return cita;
          }));
          
          setCitasPaciente(citasConDoctores);
        } catch (error) {
          console.error('Error:', error);
          setError('Error al cargar las citas del paciente');
        }
      }
    };

    fetchEspecializaciones();
    fetchDoctores();
    fetchCitasPaciente();
  }, []);

  useEffect(() => {
    if (especializacionSeleccionada) {
      const doctoresFiltrados = doctores.filter(
        doctor => doctor.especializacion === especializacionSeleccionada
      );
      setDoctoresFiltrados(doctoresFiltrados);
    } else {
      setDoctoresFiltrados([]);
    }
  }, [especializacionSeleccionada, doctores]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const doctorSeleccionadoObj = doctores.find(d => d.id_medico.toString() === doctorSeleccionado);

    if (!user.cedula || !doctorSeleccionadoObj) {
      setError('Información de usuario o doctor no válida');
      setIsLoading(false);
      return;
    }

    const nuevaCita = {
      cedula_paciente: user.cedula,
      cedula_medico: doctorSeleccionadoObj.cedula,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada + ':00'
    };

    try {
      const response = await fetch('https://telemedicina-api.onrender.com/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCita),
      });

      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }

      const citaAgendada = await response.json();
      
      // Fetch doctor information for the new appointment
      const doctorResponse = await fetch(`https://telemedicina-api.onrender.com/api/medico/cedula/${citaAgendada.cedula_medico}`);
      if (doctorResponse.ok) {
        const doctorData = await doctorResponse.json();
        citaAgendada.doctor = doctorData;
      }
      
      setCitasPaciente([...citasPaciente, citaAgendada]);
      alert('¡Cita agendada con éxito!');

      // Limpiar el formulario
      setFechaSeleccionada('');
      setHoraSeleccionada('');
      setEspecializacionSeleccionada('');
      setDoctorSeleccionado('');
    } catch (error) {
      console.error('Error:', error);
      setError('Error al agendar la cita. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Calendar className="mr-2" /> Citas
      </h1>

      {/* Sección de citas del paciente */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mis Citas</h2>
        {citasPaciente.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {citasPaciente.map((cita) => (
                  <tr key={cita.id_cita}>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(cita.fecha).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{cita.hora}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cita.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        cita.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cita.doctor ? `${cita.doctor.nombre} ${cita.doctor.apellido}` : 'Cargando...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tienes citas programadas.</p>
        )}
      </div>

      {/* Formulario para agendar nueva cita */}
      <h2 className="text-2xl font-semibold mb-4">Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
            Fecha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha"
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora">
            Hora
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hora"
            value={horaSeleccionada}
            onChange={(e) => setHoraSeleccionada(e.target.value)}
            required
          >
            <option value="">Seleccione una hora</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especializacion">
            Especialización
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="especializacion"
            value={especializacionSeleccionada}
            onChange={(e) => {
              setEspecializacionSeleccionada(e.target.value);
              setDoctorSeleccionado('');
            }}
            required
          >
            <option value="">Seleccione una especialización</option>
            {especializaciones.map((especializacion) => (
              <option key={especializacion} value={especializacion}>
                {especializacion}
              </option>
            ))}
          </select>
        </div>
        {especializacionSeleccionada && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor">
              Doctor
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="doctor"
              value={doctorSeleccionado}
              onChange={(e) => setDoctorSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un doctor</option>
              {doctoresFiltrados.map((doctor) => (
                <option key={doctor.id_medico} value={doctor.id_medico}>
                  {`${doctor.nombre} ${doctor.apellido} - Tel: ${doctor.telefono}`}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Agendando...' : 'Agendar Cita'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaginaCitas