import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'
import { Video, Calendar, FileText, Home } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import PaginaInicio from './pages/PaginaInicio'
import PaginaCitas from './pages/PaginaCitas'
import PaginaConsulta from './pages/PaginaConsulta'
import PaginaHistorialMedico from './pages/PaginaHistorialMedico'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };

    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);

    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/" element={isAuthenticated ? <PaginaInicio /> : <Navigate to="/login" />} />
            <Route path="/citas" element={isAuthenticated ? <PaginaCitas /> : <Navigate to="/login" />} />
            <Route path="/consulta" element={isAuthenticated ? <PaginaConsulta /> : <Navigate to="/login" />} />
            <Route path="/historial-medico" element={isAuthenticated ? <PaginaHistorialMedico /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
        {isAuthenticated && (
          <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
            <div className="container mx-auto px-4">
              <ul className="flex justify-around py-2">
                <li>
                  <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-green-600">
                    <Home size={24} />
                    <span className="text-xs mt-1">Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/citas" className="flex flex-col items-center text-gray-600 hover:text-green-600">
                    <Calendar size={24} />
                    <span className="text-xs mt-1">Citas</span>
                  </Link>
                </li>
                <li>
                  <Link to="/consulta" className="flex flex-col items-center text-gray-600 hover:text-green-600">
                    <Video size={24} />
                    <span className="text-xs mt-1">Consulta</span>
                  </Link>
                </li>
                <li>
                  <Link to="/historial-medico" className="flex flex-col items-center text-gray-600 hover:text-green-600">
                    <FileText size={24} />
                    <span className="text-xs mt-1">Historial</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    </Router>
  )
}

export default App