/**
 * Exemple d'implémentation d'une page démontrant l'utilisation des composants communs
 * Cette page sert de référence pour la structure et l'utilisation des composants partagés
 */

// Importation des dépendances
import { useState } from 'react'  // Hook React pour gérer l'état local

// Importation des composants personnalisés depuis le dossier components
import { 
  Sidebar,         // Barre latérale de navigation
  PageHeader,      // En-tête de page personnalisé
  CategoryTabs,    // Navigation par onglets de catégories
  StudySetHeader,  // En-tête pour la section des séries d'étude
  StudySetCard     // Carte représentant une série d'étude
} from '../components'

/**
 * Composant ExamplePage
 * Affiche une page exemple avec différents composants d'interface utilisateur
 * pour démontrer leur utilisation et leur intégration
 */
export default function ExamplePage() {
  // État pour suivre l'onglet actif dans la navigation par catégories
  const [activeTab, setActiveTab] = useState('tous les sets')

  // Données de démonstration pour les cartes d'étude
  // En situation réelle, ces données viendraient probablement d'une API
  const studySets = [
    {
      id: 1,  // Identifiant unique de la série d'étude
      title: 'Question sur intégrales',  // Titre de la série
      correctAnswers: 12,  // Nombre de réponses correctes
      wrongAnswers: 5,     // Nombre de réponses incorrectes
      tags: ['Mathématiques', 'Analyse', 'Intégrales']  // Étiquettes de catégorisation
    },
    {
      id: 2,
      title: 'Dérivées partielles',
      correctAnswers: 8,
      wrongAnswers: 3,
      tags: ['Mathématiques', 'Analyse', 'Dérivées']
    },
    {
      id: 3,
      title: 'Suites numériques',
      correctAnswers: 15,
      wrongAnswers: 2,
      tags: ['Mathématiques', 'Analyse', 'Suites']
    }
  ]
  
  const handleRevise = (setId) => {
    console.log('Révision du set:', setId)
    // Ici vous pouvez ajouter la logique pour démarrer la révision
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="bibliotheque" />
      
      <main className="flex-1 flex flex-col bg-white overflow-auto">
        <PageHeader greeting="Bonjour Utilisateur !" />
        
        <div className="px-6 py-4 bg-[#FFFEEC] flex-1">
          <StudySetHeader />
          
          <CategoryTabs
            tabs={['tous les sets', 'révision', 'favoris']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {studySets.map((set) => (
              <StudySetCard
                key={set.id}
                title={set.title}
                correctAnswers={set.correctAnswers}
                wrongAnswers={set.wrongAnswers}
                tags={set.tags}
                onRevise={() => handleRevise(set.id)}
              />
            ))}
            
            {/* Bouton pour ajouter un nouveau set */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 hover:border-[#7A4BC7] transition-colors cursor-pointer">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-gray-600 font-medium">Nouveau set d'étude</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
