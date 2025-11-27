import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Group 2.png';

const Header = () => {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Edumate Logo" className="h-12" />
          </Link>
          <nav className="ml-10 hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Accueil</Link>
            <Link to="/generer-quiz" className="text-gray-700 hover:text-indigo-600 font-medium">Fonctionnalités</Link>
            <Link to="#" className="text-gray-700 hover:text-indigo-600 font-medium">Tarifs</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 rounded-lg transition">
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
