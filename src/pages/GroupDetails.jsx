/**
 * Page de détails d'un groupe
 * Affiche les informations détaillées d'un groupe spécifique et permet d'interagir avec celui-ci
 */

// Importation des hooks React
import { useState } from 'react'  // Gestion de l'état local

// Importation des hooks de routage
import { useParams, useNavigate } from 'react-router-dom'

// Importation des composants personnalisés
import Sidebar from '../components/Sidebar'      // Barre latérale de navigation
import PageHeader from '../components/PageHeader' // En-tête de page personnalisé

export default function GroupDetails() {
  // Récupération de l'ID du groupe depuis les paramètres d'URL
  const { id } = useParams()
  
  // Hook pour la navigation programmatique
  const navigate = useNavigate()
  
  // État pour gérer l'onglet actif dans la vue des détails du groupe
  const [activeTab, setActiveTab] = useState('fil-actualite')
  
  // État pour gérer la visibilité de la barre latérale
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  /**
   * Bascule la visibilité de la barre latérale
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)  // Inverse l'état actuel de la barre latérale
  }

  // Données du groupe (en production, cela viendrait d'une API)
  const group = {
    id: id,
    title: 'Group Physique Estin',
    description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
    members: 120,
    resources: 45
  }

  const tabs = [
    { id: 'fil-actualite', label: "Fil d'actualite" },
    { id: 'ressources', label: 'Ressources' },
    { id: 'members', label: 'Members' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'classements', label: 'Classements' }
  ]

  const activities = [
    {
      id: 1,
      author: 'Rihab Katib',
      action: 'a partage un nouveau quiz : Analyse 3',
      time: '10 min ago',
      likes: 12,
      comments: 12
    },
    {
      id: 2,
      author: 'Rihab Katib',
      action: 'a partage un nouveau quiz : Analyse 3',
      time: '10 min ago',
      likes: 12,
      comments: 12
    }
  ]

  // Données des ressources
  const resources = [
    {
      id: 1,
      name: 'Cours',
      type: 'folder',
      items: [
        { 
          id: 101, 
          name: 'Cours d\'analyse 3.pdf', 
          type: 'pdf', 
          size: '2.4 MB', 
          date: '15 Nov 2023',
          author: 'Prof. Ahmed',
          downloads: 42
        },
        { 
          id: 102, 
          name: 'TD Analyse 3.pdf', 
          type: 'pdf', 
          size: '1.8 MB', 
          date: '10 Nov 2023',
          author: 'Prof. Ahmed',
          downloads: 35
        },
        { 
          id: 103, 
          name: 'Correction TP1.pdf', 
          type: 'pdf', 
          size: '3.1 MB', 
          date: '5 Nov 2023',
          author: 'Prof. Ahmed',
          downloads: 28
        }
      ]
    },
    {
      id: 2,
      name: 'Examens',
      type: 'folder',
      items: [
        { 
          id: 201, 
          name: 'Examen 2022-2023.pdf', 
          type: 'pdf', 
          size: '1.5 MB', 
          date: '20 Jan 2023',
          author: 'Prof. Ahmed',
          downloads: 56
        },
        { 
          id: 202, 
          name: 'Correction Examen 2022.pdf', 
          type: 'pdf', 
          size: '2.0 MB', 
          date: '15 Jan 2023',
          author: 'Prof. Ahmed',
          downloads: 48
        }
      ]
    },
    {
      id: 3,
      name: 'Exercices',
      type: 'folder',
      items: [
        { 
          id: 301, 
          name: 'Série 1.pdf', 
          type: 'pdf', 
          size: '1.2 MB', 
          date: '1 Nov 2023',
          author: 'Prof. Ahmed',
          downloads: 39
        },
        { 
          id: 302, 
          name: 'Série 2.pdf', 
          type: 'pdf', 
          size: '1.0 MB', 
          date: '25 Oct 2023',
          author: 'Prof. Ahmed',
          downloads: 31
        },
        { 
          id: 303, 
          name: 'Série 3.pdf', 
          type: 'pdf', 
          size: '1.4 MB', 
          date: '18 Oct 2023',
          author: 'Prof. Ahmed',
          downloads: 27
        }
      ]
    },
    {
      id: 4,
      name: 'Résumé du cours',
      type: 'pdf',
      size: '4.2 MB',
      date: '30 Oct 2023',
      author: 'Prof. Ahmed',
      downloads: 67
    },
    {
      id: 5,
      name: 'Formulaire.pdf',
      type: 'pdf',
      size: '1.8 MB',
      date: '25 Oct 2023',
      author: 'Prof. Ahmed',
      downloads: 53
    }
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="mes-groupes" isCollapsed={!isSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <PageHeader 
          greeting="Bonjour [Prénom] !"
          searchPlaceholder="Rechercher..."
          onMenuToggle={toggleSidebar}
        />

        {/* Group Details Header */}
        <div className="px-6 py-6 bg-[#FFFEEC] border-b border-gray-200">
          <button 
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F0E6FF]">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" fill="#8A4FFF"/>
                <path d="M16 20C8.26801 20 2 23.5817 2 28C2 28.5523 2.44772 29 3 29H29C29.5523 29 30 28.5523 30 28C30 23.5817 23.732 20 16 20Z" fill="#8A4FFF"/>
              </svg>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{group.title}</h1>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>Membres : {group.members}</span>
                <span>Ressources : {group.resources}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Group Details Tabs */}
        <div className="px-6 py-4 border-b border-gray-200 bg-[#FFFEEC]">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-edumate-purple-dark text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          {activeTab === 'fil-actualite' && (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-edumate-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">
                        <span className="font-semibold">{activity.author}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">{activity.time}</p>
                      
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-sm">{activity.likes} Like</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">{activity.comments} Commentairs</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-sm">Aperçu</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'ressources' && (
            <div className="space-y-4">
              {resources.flatMap(resource => 
                resource.type === 'folder' ? resource.items : resource
              ).map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 ${item.type === 'pdf' ? 'bg-purple-100' : 'bg-red-100'} rounded-lg flex-shrink-0`}>
                      <svg className={`w-6 h-6 ${item.type === 'pdf' ? 'text-purple-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-900 font-medium text-lg mb-1">{item.name}</p>
                          <p className="text-sm text-gray-500 mb-3">
                            Type: {item.type.toUpperCase()} • Créé par {item.author} • {item.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            Télécharger
                          </button>
                          <button className="px-5 py-2.5 bg-[#8760E2] hover:bg-[#7a54d4] text-white font-medium rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                            Consulter
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-sm">{item.likes || 0} J'aime</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">{item.comments || 0} Commentaires</span>
                        </button>
                        
                        <span className="text-sm text-gray-500 ml-auto">
                          {item.downloads} téléchargements
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="space-y-3">
              {/* Member 1 - Createur */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-xl text-gray-900">Jean Dupont</h4>
                      <span className="inline-flex items-center justify-center w-28 px-4 py-1.5 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300">
                        Créateur
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        24 Contributions
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        1,245 Points
                      </span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 border border-[#CBD83B] text-[#CBD83B] font-medium rounded-lg text-sm hover:bg-[#CBD83B] hover:text-white hover:border-[#CBD83B] transition-colors">
                  Connecter
                </button>
              </div>

              {/* Member 2 - Mentor */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-xl text-gray-900">Marie Martin</h4>
                      <span className="inline-flex items-center justify-center w-28 px-4 py-1.5 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300">
                        Mentor
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        18 Contributions
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        987 Points
                      </span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 border border-[#CBD83B] text-[#CBD83B] font-medium rounded-lg text-sm hover:bg-[#CBD83B] hover:text-white hover:border-[#CBD83B] transition-colors">
                  Connecter
                </button>
              </div>

              {/* Member 3 - Membre */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-xl text-gray-900">Thomas Simon</h4>
                      <span className="inline-flex items-center px-5 py-1.5 rounded-full text-base font-medium bg-white text-gray-700 border border-gray-300">
                        Membre
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        12 Contributions
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        756 Points
                      </span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 border border-[#CBD83B] text-[#CBD83B] font-medium rounded-lg text-sm hover:bg-[#CBD83B] hover:text-white hover:border-[#CBD83B] transition-colors">
                  Connecter
                </button>
              </div>

              {/* Member 4 - Membre */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-xl text-gray-900">Sarah Lee</h4>
                      <span className="inline-flex items-center px-5 py-1.5 rounded-full text-base font-medium bg-white text-gray-700 border border-gray-300">
                        Membre
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        8 Contributions
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        432 Points
                      </span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 border border-[#CBD83B] text-[#CBD83B] font-medium rounded-lg text-sm hover:bg-[#CBD83B] hover:text-white hover:border-[#CBD83B] transition-colors">
                  Connecter
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              <div className="space-y-8">
                {/* Bouton Nouvelle discussion */}
                <div className="flex justify-end">
                  <button className="px-5 py-2.5 bg-[#8760E2] hover:bg-[#7a54d4] text-white font-medium rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                    Nouvelle discussion
                  </button>
                </div>

                {/* Liste des discussions */}
                <div className="space-y-6">
                  {/* Discussion 1 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">Questions sur le chapitre 4</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Par Jean Dupont</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          5 réponses
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#8760E2] border border-[#8760E2] rounded-lg hover:bg-[#8760E2] hover:text-white transition-colors">
                      Voir
                    </button>
                  </div>
                  </div>

                  {/* Discussion 2 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">Problème avec l'exercice 2</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Par Marie Martin</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          3 réponses
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#8760E2] border border-[#8760E2] rounded-lg hover:bg-[#8760E2] hover:text-white transition-colors">
                      Voir
                    </button>
                  </div>
                  </div>

                  {/* Discussion 3 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">Rappel : Dépôt des projets</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Par Thomas Simon</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          12 réponses
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#8760E2] border border-[#8760E2] rounded-lg hover:bg-[#8760E2] hover:text-white transition-colors">
                      Voir
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'classements' && (
            <div className="space-y-6">
              {/* Espacement avant la liste */}
              <div className="mb-4"></div>

              {/* Liste des classements */}
              <div className="space-y-4">
                {/* Premier du classement */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xl">
                          1
                        </div>
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Jean Dupont</h3>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">450 pts</div>
                  </div>
                </div>

                {/* Deuxième du classement */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
                          2
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Marie Martin</h3>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">375 pts</div>
                  </div>
                </div>

                {/* Troisième du classement */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xl">
                          3
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Thomas Simon</h3>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">300 pts</div>
                  </div>
                </div>

                {/* Autres participants */}
                {[4, 5, 6, 7, 8, 9, 10].map((position) => (
                  <div key={position} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 font-medium">
                          {position}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Étudiant {position}</h3>
                        </div>
                      </div>
                      <div className="text-gray-600">{300 - (position * 25)} pts</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-8 text-sm text-gray-500 text-center">
                <p>Le classement est mis à jour chaque semaine</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}


