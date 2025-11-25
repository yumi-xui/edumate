import React from 'react';

export default function QuizHeader({ 
  title = 'Quiz sur les intégrales',
  correctAnswers = 12,
  wrongAnswers = 5,
  totalQuestions = 17,
  lastUpdated = 'Il y a 2 jours'
}) {

  const handleReviseClick = () => {
    console.log('Début de la révision du quiz');
    // Logique pour commencer la révision du quiz
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>{correctAnswers} réponses correctes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>{wrongAnswers} réponses incorrectes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>•</span>
              <span>Dernière mise à jour : {lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleReviseClick}
            className="px-6 py-2.5 bg-[#7A4BC7] text-white font-medium rounded-lg hover:bg-[#6a3fb0] transition-colors whitespace-nowrap"
          >
            Réviser le quiz
          </button>
        </div>
      </div>
    </div>
  );
}
