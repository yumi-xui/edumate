import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'

export default function CreateGroup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique pour créer le groupe (appel API, etc.)
    console.log('Création du groupe:', formData)
    // Rediriger vers la page des groupes après création
    navigate('/')
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="mes-groupes" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white">
        <PageHeader 
          greeting="Créer un nouveau groupe"
          searchPlaceholder="Rechercher..."
        />

        {/* Form Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Informations du groupe
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du groupe *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all"
                    placeholder="Entrez le nom du groupe"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Décrivez votre groupe..."
                  />
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all"
                    placeholder="Ex: Physique, Mathématiques, etc."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#7A4BC7] text-white rounded-lg font-semibold hover:bg-[#6a3fb8] transition-colors"
                  >
                    Créer le groupe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

