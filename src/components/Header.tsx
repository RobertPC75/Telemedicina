import React from 'react'
import { Heart, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Heart size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Plataforma de Telemedicina</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-4">Bienvenido, {user.nombre}</span>
          <button onClick={handleLogout} className="flex items-center hover:text-green-200">
            <LogOut size={20} className="mr-1" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header