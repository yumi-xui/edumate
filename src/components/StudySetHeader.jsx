import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function StudySetHeader() {
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

  // Vérifier si nous sommes sur la page de génération de quiz
  const isGenerateQuizPage = location.pathname === '/generate-quiz';

  // Données d'exemple pour le cours
  const courseData = {
    title: 'Analyse Mathématique',
    correctAnswers: 15,
    wrongAnswers: 5,
    totalQuestions: 20,
    lastUpdated: 'Il y a 2 jours'
  };

  const handleReviseClick = () => {
    // Logique pour commencer la révision
    console.log('Début de la révision');
  };

  // Ne rien afficher si nous sommes sur la page de génération de quiz
  if (isGenerateQuizPage) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* En-tête avec titre et bouton */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>{courseData.correctAnswers} bonnes réponses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>{courseData.wrongAnswers} mauvaises réponses</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span>•</span>
                <span>Dernière mise à jour : {courseData.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 inline-block mr-1 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              Plus
            </button>
            <button 
              onClick={handleReviseClick}
              className="px-6 py-2 bg-[#7A4BC7] text-white font-medium rounded-lg hover:bg-[#6a3fb0] transition-colors whitespace-nowrap"
            >
              Réviser le set
            </button>
          </div>
        </div>
      </div>
      
      {/* Barre d'étiquettes */}
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-[#7A4BC7] text-white text-sm font-medium rounded-full whitespace-nowrap">
          Toutes les cartes
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 whitespace-nowrap">
          Non révisées
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 whitespace-nowrap">
          À revoir
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 whitespace-nowrap">
          Maîtrisées
        </button>
      </div>
    </div>
  );
}
