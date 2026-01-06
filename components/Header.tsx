
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const activeLinkClass = "bg-blue-600 text-white";
  const inactiveLinkClass = "bg-white text-blue-600 hover:bg-blue-50";

  return (
    <header className="bg-white shadow-md w-full p-4 flex justify-between items-center z-10 flex-shrink-0">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          CivicBridge
        </h1>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
        >
          Report Issue
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
        >
          Admin Dashboard
        </NavLink>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
