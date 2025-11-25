# Composants Edumate

Cette documentation explique comment utiliser les composants réutilisables d'Edumate.

## Installation

Les composants sont déjà disponibles dans le projet. Importez-les depuis `./components` ou `./components/index.js`.

## Composants disponibles

### Logo
Composant du logo Edumate avec le personnage vert et violet.

```jsx
import { Logo } from './components'

// Utilisation basique
<Logo />

// Sans texte
<Logo showText={false} />

// Tailles disponibles: sm, md, lg
<Logo size="lg" />
```

### Sidebar
Barre latérale avec menu de navigation et profil utilisateur.

```jsx
import { Sidebar } from './components'

<Sidebar activeMenuItem="mes-groupes" />
```

**Props:**
- `activeMenuItem` (string): ID de l'élément de menu actif ('quiz', 'mes-groupes', 'bibliotheque', 'forum')

### PageHeader
En-tête de page avec barre de recherche et salutation.

```jsx
import { PageHeader } from './components'

<PageHeader 
  greeting="Bonjour [Prénom] !"
  onSearch={(query) => console.log(query)}
  searchPlaceholder="Rechercher..."
/>
```

**Props:**
- `greeting` (string): Message de salutation
- `onSearch` (function): Callback appelé lors de la recherche
- `searchPlaceholder` (string): Placeholder de la barre de recherche

### CategoryTabs
Onglets de catégories avec bouton de création.

```jsx
import { CategoryTabs } from './components'

const [activeTab, setActiveTab] = useState('mes groupes')

<CategoryTabs
  tabs={['mes groupes', 'explore more']}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onCreateClick={() => console.log('Créer')}
/>
```

**Props:**
- `tabs` (array): Liste des onglets
- `activeTab` (string): Onglet actif (contrôlé)
- `onTabChange` (function): Callback lors du changement d'onglet
- `onCreateClick` (function): Callback pour le bouton de création

### GroupCard
Carte de groupe avec informations et bouton d'action.

```jsx
import { GroupCard } from './components'

<GroupCard
  title="Group Physique Estin"
  description="Description du groupe"
  members={120}
  resources={45}
  onConsultClick={() => console.log('Consulter')}
/>
```

**Props:**
- `title` (string): Titre du groupe
- `description` (string): Description du groupe
- `members` (number): Nombre de membres
- `resources` (number): Nombre de ressources
- `onConsultClick` (function): Callback pour le bouton "consulter"
- `icon` (element): Icône personnalisée (optionnel)

### UserProfileCard
Carte de profil utilisateur.

```jsx
import { UserProfileCard } from './components'

<UserProfileCard 
  userName="Katib Rihab"
  status="Connected"
/>
```

**Props:**
- `userName` (string): Nom de l'utilisateur
- `status` (string): Statut de l'utilisateur

### SearchBar
Barre de recherche standalone.

```jsx
import { SearchBar } from './components'

<SearchBar 
  placeholder="Rechercher..."
  onSearch={(query) => console.log(query)}
/>
```

## Exemple complet

```jsx
import { useState } from 'react'
import { Sidebar, PageHeader, CategoryTabs, GroupCard } from './components'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('mes groupes')

  const groups = [
    {
      id: 1,
      title: 'Mon Groupe',
      description: 'Description',
      members: 50,
      resources: 20
    }
  ]

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="mes-groupes" />
      
      <main className="flex-1 flex flex-col bg-white">
        <PageHeader greeting="Bonjour !" />
        
        <CategoryTabs
          tabs={['mes groupes', 'explore more']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              {...group}
              onConsultClick={() => console.log(group)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
```


