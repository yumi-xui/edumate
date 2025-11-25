import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';

export default function GenerateQcmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [generatedQCM, setGeneratedQCM] = useState(null);
  const [subject, setSubject] = useState('');

  // Récupérer le contenu du cours depuis l'état de navigation
  useEffect(() => {
    if (location.state?.content) {
      setCourseContent(location.state.content);
    }
  }, [location.state]);

  const handleGenerateQCM = () => {
    if (!courseContent.trim()) {
      alert('Veuillez coller ou importer le contenu du cours');
      return;
    }
    
    setIsGenerating(true);
    
    // Simuler la génération du QCM
    setTimeout(() => {
      // Exemple de données de QCM générées
      const sampleQCM = {
        title: subject ? `QCM sur ${subject}` : 'QCM sur le contenu du cours',
        questions: [
          {
            id: 1,
            question: 'Quelle est la dérivée de x² ?',
            options: ['2x', 'x', '2', 'x²'],
            correctAnswer: 0
          },
          // Ajoutez plus de questions ici...
        ]
      };
      
      setGeneratedQCM(sampleQCM);
      setIsGenerating(false);
    }, 2000);
  };

  const handleStartQuiz = () => {
    // Naviguer vers la page de quiz avec les questions générées
    navigate('/quiz', { state: { quiz: generatedQCM } });
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="quiz" />

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <PageHeader 
          greeting="Générer un QCM"
          searchPlaceholder="Rechercher..."
        />

        <div className="flex-1 overflow-y-auto bg-[#FFFEEC] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du QCM</h1>
              
              <div className="space-y-6">
                <div className="mb-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Matière / Sujet du QCM :
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Mathématiques, Physique, Histoire..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  
                  <label className="block text-gray-700 font-medium mb-2">
                    Contenu du cours :
                  </label>
                  <textarea
                    value={courseContent}
                    onChange={(e) => setCourseContent(e.target.value)}
                    className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Collez le contenu de votre cours ici..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent"
                    >
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      <option value="hard">Difficile</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de questions: {numberOfQuestions}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={numberOfQuestions}
                      onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5</span>
                      <span>20</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleGenerateQCM}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-[#7A4BC7] text-white font-medium rounded-lg hover:bg-[#6a3fb0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Génération en cours...
                      </>
                    ) : 'Générer le QCM'}
                  </button>
                </div>
              </div>
            </div>

            {generatedQCM && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">QCM Généré</h2>
                <p className="text-gray-600 mb-6">Votre QCM est prêt ! Cliquez sur le bouton ci-dessous pour commencer.</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{generatedQCM.title}</h3>
                    <p className="text-sm text-gray-500">{generatedQCM.questions.length} questions • Difficulté: {difficulty === 'easy' ? 'Facile' : difficulty === 'medium' ? 'Moyen' : 'Difficile'}</p>
                  </div>
                  <button
                    onClick={handleStartQuiz}
                    className="px-6 py-2.5 bg-[#7A4BC7] text-white font-medium rounded-lg hover:bg-[#6a3fb0] transition-colors"
                  >
                    Commencer le quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
