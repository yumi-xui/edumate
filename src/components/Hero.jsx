import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/yyy.png';

const Hero = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              <div>Révisez plus</div>
              <div className="whitespace-nowrap"><span className="text-[#A88AED]">intelligemment</span>, <span className="text-black">ensemble</span></div>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Générez des quiz avec l'IA et révisez en groupe pour maximiser votre réussite académique.
            </p>
            <Link 
              to="/generer-quiz"
              className="inline-block bg-[#CBD83B] hover:bg-[#b8c534] text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Créer mon premier quiz
            </Link>
          </div>
          <div className="lg:w-1/2 flex justify-center items-start">
            <img 
              src={heroImage} 
              alt="Edumate en action" 
              className="w-auto h-[70vh] max-w-[100%] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
