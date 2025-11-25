import { useState } from 'react';

export default function StudySetCard({ 
  title = 'Question sur integrales', 
  correctAnswers = 0, 
  wrongAnswers = 0,
  onRevise 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-gray-600">Bonnes réponses: {correctAnswers}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm text-gray-600">Mauvaises réponses: {wrongAnswers}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              Mathématiques
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Analyse
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Intégrales
            </span>
          </div>
          
          <button 
            onClick={onRevise}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isHovered 
                ? 'bg-[#7A4BC7] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Réviser
          </button>
        </div>
      </div>
    </div>
  );
}
