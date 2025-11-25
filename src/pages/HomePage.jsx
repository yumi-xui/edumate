import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { FaUsers, FaRobot, FaChartLine } from 'react-icons/fa';

const HomePage = () => {
  const features = [
    {
      icon: <FaUsers className="text-indigo-600 text-2xl" />,
      title: "Collaboration",
      description: "Créez des groupes d'étude et partagez vos ressources avec vos camarades."
    },
    {
      icon: <FaRobot className="text-indigo-600 text-2xl" />,
      title: "Génération IA",
      description: "Transformez vos cours en quiz instantanément grâce à notre intelligence artificielle avancée."
    },
    {
      icon: <FaChartLine className="text-indigo-600 text-2xl" />,
      title: "Suivi de progression",
      description: "Suivez vos résultats et progressez grâce à des statistiques détaillées."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos fonctionnalités</h2>
              <p className="text-xl text-gray-600">Découvrez comment Edumate peut transformer votre façon d'apprendre</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-6">Prêt à booster votre apprentissage ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez des milliers d'étudiants qui utilisent déjà Edumate pour réussir leurs études.</p>
            <a 
              href="/signup" 
              className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Commencer gratuitement
            </a>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img src="/logo.png" alt="Edumate Logo" className="h-8 mr-2" />
                <span className="text-xl font-bold">Edumate</span>
              </div>
              <p className="mt-2 text-gray-400">L'outil ultime pour réviser efficacement</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Mentions légales</a>
              <a href="#" className="text-gray-400 hover:text-white">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Edumate. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
