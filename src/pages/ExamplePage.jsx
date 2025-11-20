// Exemple d'utilisation des composants dans une autre page
import { useState } from 'react'
import { Sidebar, PageHeader, CategoryTabs, GroupCard } from '../components'

export default function ExamplePage() {
  const [activeTab, setActiveTab] = useState('mes groupes')

  // Exemple de données
  const groups = [
    {
      id: 1,
      title: 'Groupe Exemple 1',
      description: 'Description du groupe exemple',
      members: 50,
      resources: 20
    }
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="bibliotheque" />
      
      <main className="flex-1 flex flex-col bg-white">
        <PageHeader greeting="Bonjour Utilisateur !" />
        
        <CategoryTabs
          tabs={['mes groupes', 'explore more']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                title={group.title}
                description={group.description}
                members={group.members}
                resources={group.resources}
                onConsultClick={() => console.log('Consulter:', group)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


