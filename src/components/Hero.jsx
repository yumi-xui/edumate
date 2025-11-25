import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/télécharger (1).jpg';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Révisez plus <span className="text-indigo-600">intelligemment, ensemble</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Générez des quiz avec l'IA et révisez en groupe pour maximiser votre réussite académique.
            </p>
            <Link 
              to="/generer-quiz"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Créer mon premier quiz
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={heroImage} 
              alt="Edumate en action" 
              className="max-w-md w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
