// Importation des hooks et composants nécessaires
import { useState } from 'react'  // Pour gérer l'état local
import { useNavigate } from 'react-router-dom'  // Pour la navigation entre les pages
import Sidebar from '../components/Sidebar'  // Barre latérale de navigation
import PageHeader from '../components/PageHeader'  // En-tête de page
import CategoryTabs from '../components/CategoryTabs'  // Onglets de catégorie
import GroupCard from '../components/GroupCard'  // Carte représentant un groupe

export default function Groups() {
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState('mes groupes')
  // État pour gérer la recherche
  const [searchQuery, setSearchQuery] = useState('')
  // Hook pour la navigation
  const navigate = useNavigate()

  // Données temporaires des groupes (à remplacer par un appel API plus tard)
  const groups = [
    {
      id: 1,
      title: 'Group Physique Estin',
      description: 'descriptionnn bbbbbbbbbbbbbbbbbbbbbbbbbb',
      members: 120,  // Nombre de membres dans le groupe
      resources: 45  // Nombre de ressources partagées
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

  // Gestion de la recherche
  const handleSearch = (query) => {
    setSearchQuery(query)
    // TODO: Implémenter la logique de filtrage des groupes
  }

  // Redirection vers la page de création d'un groupe
  const handleCreateGroup = () => {
    navigate('/create-group')
  }

  // Redirection vers la page de détail d'un groupe
  const handleConsultGroup = (group) => {
    navigate(`/group/${group.id}`)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Barre latérale avec l'élément 'mes-groupes' actif */}
      <Sidebar activeMenuItem="mes-groupes" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white">
        <PageHeader 
          greeting="Bonjour [Prénom] !"
          onSearch={handleSearch}
          searchPlaceholder="Rechercher..."
        />

        <CategoryTabs
          tabs={['mes groupes', 'explore more']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateClick={handleCreateGroup}
        />

        {/* Liste des groupes avec défilement vertical */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          {/* Grille des cartes de groupe */}
          <div className="grid grid-cols-1 gap-4">
            {/* Boucle sur chaque groupe pour afficher une carte */}
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                title={group.title}
                description={group.description}
                members={group.members}
                resources={group.resources}
                onConsultClick={() => handleConsultGroup(group)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


