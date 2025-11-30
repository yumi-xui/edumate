// Importation des dépendances nécessaires
import { useState } from 'react'  // Gestion de l'état local du composant
import { useNavigate } from 'react-router-dom'  // Navigation entre les pages
import { supabase } from '../lib/supabase'  // Client Supabase pour les opérations de base de données
import Sidebar from '../components/Sidebar'  // Barre latérale de navigation
import PageHeader from '../components/PageHeader'  // En-tête de page personnalisé

/**
 * Composant CreateGroup
 * Permet à un utilisateur de créer un nouveau groupe d'étude
 * Gère la soumission du formulaire, la validation et la création du groupe dans la base de données
 */
export default function CreateGroup() {
  // Utilisation du hook useNavigate pour la navigation entre les pages
  const navigate = useNavigate()
  
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    title: '',        // Titre du groupe
    description: '',  // Description du groupe
    category: ''      // Catégorie du groupe
  })
  
  // État pour gérer le chargement pendant la soumission du formulaire
  const [isLoading, setIsLoading] = useState(false)
  // État pour stocker les messages d'erreur
  const [error, setError] = useState('')

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Object} e - L'événement de changement
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value  // Met à jour dynamiquement le champ modifié
    }))
  }

  /**
   * Gère la soumission du formulaire de création de groupe
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault()  // Empêche le rechargement de la page
    setError('')  // Réinitialise les erreurs précédentes
    setIsLoading(true)  // Active l'état de chargement

    try {
      // Vérifier que l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('Vous devez être connecté pour créer un groupe')
      }

      // Insérer le nouveau groupe dans la table 'groups'
      const { data: newGroup, error: insertError } = await supabase
        .from('groups')
        .insert([
          { 
            name: formData.title,
            description: formData.description,
            category: formData.category,
            created_by: user.id,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (insertError) throw insertError

      // Ajouter l'utilisateur comme membre du groupe avec le rôle 'admin'
      const { error: memberError } = await supabase
        .from('group_members')
        .insert([
          {
            group_id: newGroup.id,
            user_id: user.id,
            role: 'admin',
            joined_at: new Date().toISOString()
          }
        ])

      if (memberError) throw memberError

      // Rediriger vers la page des groupes après création réussie
      navigate('/groups')
      
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error)
      setError(error.message || 'Une erreur est survenue lors de la création du groupe')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Gère l'annulation de la création du groupe
   * Redirige l'utilisateur vers la page d'accueil
   */
  const handleCancel = () => {
    navigate('/')  // Navigation vers la page d'accueil
  }

  // Rendu du composant
  return (
    <div className="flex h-screen bg-white">
      {/* Barre latérale de navigation */}
      <Sidebar activeMenuItem="mes-groupes" />

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col bg-white">
        {/* En-tête de la page avec titre et barre de recherche */}
        <PageHeader 
          greeting="Créer un nouveau groupe"
          searchPlaceholder="Rechercher..."
        />

        {/* Contenu du formulaire */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#FFFEEC]">
          {/* Conteneur centré avec largeur maximale */}
          <div className="max-w-2xl mx-auto">
            {/* Carte du formulaire */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Informations du groupe
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ pour le titre du groupe */}
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

                {/* Champ pour la description du groupe */}
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

                {/* Champ pour la catégorie du groupe */}
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
                    required
                  />
                </div>

                {/* Affichage des messages d'erreur */}
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {/* Boutons d'action */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-[#7A4BC7] text-white font-medium rounded-lg hover:bg-[#6a3fb0] transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création...
                      </>
                    ) : (
                      'Créer le groupe'
                    )}
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

