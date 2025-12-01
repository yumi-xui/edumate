import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
import CategoryTabs from '../components/CategoryTabs'
import GroupCard from '../components/GroupCard'

export default function Groups() {
  const [activeTab, setActiveTab] = useState('mes groupes')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const groups = [
    {
      id: 1,
      title: 'Group Physique Estin',
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

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Vous pouvez ajouter ici la logique de filtrage
  }

  const handleCreateGroup = () => {
    navigate('/create-group')
  }

  const handleConsultGroup = (group) => {
    navigate(`/group/${group.id}`)
  }

  return (
    <div className="flex h-screen bg-white">
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

        {/* Groups List */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          <div className="grid grid-cols-1 gap-4">
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


