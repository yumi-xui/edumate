/**
 * Page de gestion des groupes
 * Affiche la liste des groupes de l'utilisateur avec des fonctionnalités de filtrage et de recherche
 */

// Importation des hooks React
import { useState } from 'react'  // Pour gérer l'état local
import { useNavigate } from 'react-router-dom'  // Pour la navigation programmatique

// Importation des composants personnalisés
import Sidebar from '../components/Sidebar'          // Barre latérale de navigation
import PageHeader from '../components/PageHeader'    // En-tête de page personnalisé
import CategoryTabs from '../components/CategoryTabs' // Onglets de catégorisation
import GroupCard from '../components/GroupCard'      // Carte représentant un groupe

export default function Groups() {
  // État pour l'onglet actif (par défaut: 'mes groupes')
  const [activeTab, setActiveTab] = useState('mes groupes')
  
  // État pour la requête de recherche
  const [searchQuery, setSearchQuery] = useState('')
  
  // Hook pour la navigation programmatique
  const navigate = useNavigate()

  // Données factices des groupes (en production, viendraient d'une API)
  const groups = [
    {
      id: 1,  // Identifiant unique du groupe
      title: 'Group Physique Estin',  // Nom du groupe
      description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
      members: 120,
      resources: 45
    },
    {
      id: 2,
      title: 'Group Physique Estin',
      description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
      members: 120,
      resources: 45
    },
    {
      id: 3,
      title: 'Group Physique Estin',
      description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
      members: 120,
      resources: 45
    },
    {
      id: 4,
      title: 'Group Physique Estin',
      description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
      members: 120,
      resources: 45
    }
  ]

  /**
   * Filtre les groupes en fonction de la requête de recherche
   * Recherche dans le titre et la description des groupes
   */
  const filteredGroups = groups.filter(group =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||  // Recherche dans le titre
    group.description.toLowerCase().includes(searchQuery.toLowerCase())  // Recherche dans la description
  )

  /**
   * Redirige vers la page de création d'un nouveau groupe
   */
  const handleCreateGroup = () => {
    navigate('/create-group')  // Navigation vers la page de création de groupe
  }

  /**
   * Gère le clic sur une carte de groupe
   * @param {number} groupId - L'identifiant du groupe sélectionné
   */
  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`)  // Navigation vers les détails du groupe
  }

  // Rendu du composant
  return (
    <div className="flex h-screen bg-white">
      {/* Barre latérale de navigation */}
      <Sidebar activeMenuItem="mes-groupes" />  // Met en surbrillance l'élément actif

      {/* Main Content */}
      {/* Contenu principal */}
      <main className="flex-1 flex flex-col bg-white">
        {/* En-tête de page avec barre de recherche et bouton de création */}
        <PageHeader 
          greeting="Mes groupes"  // Titre de la page
          searchPlaceholder="Rechercher des groupes..."  // Texte d'aide de la recherche
          onSearch={setSearchQuery}  // Gestionnaire de recherche
          showCreateButton={true}  // Affiche le bouton de création
          onCreateClick={handleCreateGroup}  // Action du bouton de création
        />

        <CategoryTabs
          tabs={['mes groupes', 'explore more']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateClick={handleCreateGroup}
        />

        {/* Groups List */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          {/* Grille des cartes de groupes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.length > 0 ? (
              // Affichage des groupes filtrés
              filteredGroups.map((group) => (
                <GroupCard 
                  key={group.id}  // Clé unique pour React
                  title={group.title}  // Titre du groupe
                  description={group.description}  // Description du groupe
                  members={group.members}  // Nombre de membres
                  resources={group.resources}  // Nombre de ressources
                  onClick={() => handleGroupClick(group.id)}  // Gestionnaire de clic
                />
              ))
            ) : (
              // Message affiché quand aucun groupe ne correspond à la recherche
              <div className="col-span-full text-center py-10 text-gray-500">
                Aucun groupe trouvé pour votre recherche.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


