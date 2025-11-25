import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import QuizHeader from '../components/QuizHeader'
import GenerateQuizPopup from '../components/GenerateQuizPopup'

export default function GenerateQuiz() {
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState('') // 'qcm' ou 'flashcards'

  const filters = ['All', 'Analyse', 'algo', 'Analyse des donnes', 'Analyse', 'Analyse', 'Analyse']

  const suggestions = [
    {
      id: 1,
      title: 'Cours d\'Analyse 3',
      category: 'Analyse',
      description: 'Les lois de Newton et leurs applications'
    },
    {
      id: 2,
      title: 'Algorithmes Avancés',
      category: 'algo',
      description: 'Structures de données et complexité'
    },
    {
      id: 3,
      title: 'Analyse des Données',
      category: 'Analyse des donnes',
      description: 'Statistiques et visualisation'
    }
  ]

  const handleImportFile = async () => {
    try {
      // Création d'un input de type fichier
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.pdf,.doc,.docx,.txt,.md,.csv,.json'
      
      // Gestion de la sélection du fichier
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
          // Vérification de la taille du fichier (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert('Le fichier est trop volumineux. La taille maximale est de 5MB.')
            return
          }

          // Lecture du contenu du fichier
          const content = await readFileContent(file)
          
          // Mise à jour du contenu du cours avec le contenu du fichier
          setCourseContent(prevContent => 
            prevContent ? `${prevContent}\n\n${content}` : content
          )
          
          // Feedback à l'utilisateur
          alert(`Fichier "${file.name}" importé avec succès !`)
          
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier:', error)
          alert('Une erreur est survenue lors de la lecture du fichier.')
        }
      }
      
      // Déclencher la sélection de fichier
      input.click()
      
    } catch (error) {
      console.error('Erreur lors de l\'importation du fichier:', error)
      alert('Une erreur est survenue lors de l\'importation du fichier.')
    }
  }
  
  // Fonction utilitaire pour lire le contenu d'un fichier
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      
      reader.onerror = (error) => {
        reject(error)
      }
      
      // Lecture en fonction du type de fichier
      if (file.type === 'application/pdf') {
        // Pour les PDF, on pourrait utiliser une bibliothèque comme pdf.js
        // Pour l'instant, on retourne juste le nom du fichier
        resolve(`[Fichier PDF: ${file.name}]`)
      } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        // Pour les documents Word, on pourrait utiliser une bibliothèque comme mammoth.js
        // Pour l'instant, on retourne juste le nom du fichier
        resolve(`[Document Word: ${file.name}]`)
      } else {
        // Pour les fichiers texte, CSV, etc.
        reader.readAsText(file)
      }
    })
  }

  const handleOpenPopup = (type) => {
    if (!courseContent.trim()) {
      alert('Veuillez coller ou importer le contenu du cours d\'abord')
      return
    }
    setPopupType(type)
    setShowPopup(true)
  }

  const handleConfirmGeneration = () => {
    setShowPopup(false)
    setIsGenerating(true)
    
    // Simuler la génération
    setTimeout(() => {
      setIsGenerating(false)
      console.log(`Génération ${popupType === 'qcm' ? 'QCM' : 'Flashcards'} pour:`, courseContent)
      // Ici vous pouvez ajouter la logique pour générer le QCM ou les flashcards
    }, 2000)
  }

  const handleGenerateQCM = () => {
    if (!courseContent.trim()) {
      alert('Veuillez coller ou importer le contenu du cours d\'abord');
      return;
    }
    // Naviguer vers la page de génération de QCM avec le contenu du cours
    navigate('/generate-qcm', { 
      state: { 
        content: courseContent,
        // Vous pouvez ajouter d'autres données à passer si nécessaire
      } 
    });
  }

  const handleGenerateFlashcards = () => {
    if (!courseContent.trim()) {
      alert('Veuillez coller ou importer le contenu du cours d\'abord')
      return
    }
    setIsGenerating(true)
    // Simuler la génération
    setTimeout(() => {
      setIsGenerating(false)
      console.log('Génération Flashcards pour:', courseContent)
      // Ici vous pouvez ajouter la logique pour générer les flashcards
    }, 2000)
  }

  const handleClear = () => {
    setCourseContent('')
  }

  const filteredSuggestions = activeFilter === 'All' 
    ? suggestions 
    : suggestions.filter(s => s.category === activeFilter)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="quiz" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <PageHeader 
          greeting="Bonjour [Prénom] !"
          searchPlaceholder="Rechercher..."
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#FFFEEC] p-6">
          {/* Import/Paste Course Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Importer / Coller un cours
              </h2>
              
              {/* Text Area */}
              <div className="mb-4">
                <textarea
                  value={courseContent}
                  onChange={(e) => setCourseContent(e.target.value)}
                  placeholder="Collez le contenu de votre cours ici..."
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all resize-none"
                />
                {!courseContent && (
                  <p className="mt-2 text-sm text-gray-500">
                    Exemple: Les lois de Newton décrivent le mouvement des corps...
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleImportFile}
                  className="px-4 py-2 bg-white text-[#7A4BC7] border border-[#7A4BC7] rounded-md font-medium text-sm hover:bg-[#7A4BC7] hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Importer
                </button>
                
                <button
                  onClick={handleGenerateQCM}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-[#CBD83B] text-black rounded-lg font-semibold hover:bg-[#b6c731] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  {isGenerating ? 'Génération...' : 'Générer QCM'}
                </button>
                
                <button
                  onClick={handleGenerateFlashcards}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-white text-[#7A4BC7] border-2 border-[#7A4BC7] rounded-lg font-medium hover:bg-[#7A4BC7] hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Générer Flashcards
                </button>
                
                <button
                  onClick={handleClear}
                  className="px-5 py-2.5 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Effacer
                </button>
              </div>
            </div>
          </div>
          
          {/* Titre et étiquettes de quiz */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Study Sets</h2>
            <div className="space-y-6">
            <QuizHeader />
            <QuizHeader 
              title="Quiz sur les dérivées"
              correctAnswers={8}
              wrongAnswers={3}
              totalQuestions={11}
              lastUpdated="Hier"
            />
            <QuizHeader 
              title="Quiz sur les limites"
              correctAnswers={10}
              wrongAnswers={2}
              totalQuestions={12}
              lastUpdated="Il y a 3 jours"
            />
            </div>
          </div>
        </div>
      </main>

      {/* Popup de confirmation */}
      <GenerateQuizPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleConfirmGeneration}
        type={popupType}
      />
    </div>
  )
}

