// Importation des hooks et composants nécessaires depuis React et React Router
import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
// Importation du contexte d'authentification personnalisé
import { useAuth } from '../contexts/AuthContext'
// Importation de l'image de fond
import backgroundImage from '../assets/frame 2329 (1).png'

export default function Login() {
  // Initialisation des hooks de navigation et d'état
  const navigate = useNavigate()
  const location = useLocation()
  // Récupération des fonctions d'authentification depuis le contexte
  const { signIn, signInWithGoogle } = useAuth()
  // États pour gérer les messages de succès et les erreurs
  const [successMessage, setSuccessMessage] = useState('')

  // Effet pour afficher un message de succès si présent dans l'état de navigation
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  // États pour gérer l'affichage du mot de passe et la case "Se souvenir de moi"
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  // États pour gérer les erreurs et le chargement
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Gestionnaire de changement pour les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    // Mise à jour des données du formulaire avec la nouvelle valeur
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Réinitialisation des erreurs lors de la modification d'un champ
    setError(null)
  }

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault() // Empêche le rechargement de la page
    setError(null) // Réinitialisation des erreurs
    setLoading(true) // Activation de l'état de chargement

    // Tentative de connexion avec email et mot de passe
    const { data, error: signInError } = await signIn(formData.email, formData.password)
    
    if (signInError) {
      // En cas d'erreur, affichage du message d'erreur
      setError(signInError.message)
      setLoading(false) // Désactivation du chargement
    } else {
      // Récupération de l'URL de redirection si elle existe
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
      // Nettoyage de l'URL de redirection après utilisation
      sessionStorage.removeItem('redirectAfterLogin');
      // Redirection vers l'URL stockée ou la page d'accueil par défaut
      navigate(redirectUrl);
    }
  }

  return (
    // Conteneur principal de la page de connexion
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Image de fond */}
      <img 
        src={backgroundImage} 
        alt="Arrière-plan" 
        className="absolute left-0 right-0 -top-10 z-0"
        style={{ width: 'auto', height: 'auto', maxWidth: 'none', maxHeight: 'none' }}
      />

      {/* Carte de formulaire */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Conteneur de la carte avec styles */}
        <div className="bg-[#FFF8E7] rounded-2xl shadow-2xl p-8">
          {/* En-tête avec titre et sous-titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to continue
          </p>
          
          {/* Affichage conditionnel du message de succès */}
          {successMessage && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md text-center">
              {successMessage}
            </div>
          )}

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Entrez votre email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white"
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Entrez votre mot de passe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white pr-12"
                />
                {/* Bouton pour afficher/masquer le mot de passe */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? (
                    // Icône d'œil barré (mot de passe visible)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    // Icône d'œil (mot de passe masqué)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Le mot de passe doit contenir au moins 8 caractères, dont des lettres, des chiffres et des symboles.
              </p>
            </div>

            {/* Case à cocher "Se souvenir de moi" et lien "Mot de passe oublié" */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#7A4BC7] border-gray-300 rounded focus:ring-[#7A4BC7]"
                />
                <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#7A4BC7] hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Affichage des messages d'erreur */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#7A4BC7] text-white rounded-lg font-semibold hover:bg-[#6a3fb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Séparateur avec texte */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-600">Ou se connecter avec :</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Bouton de connexion avec Google */}
          <button
            type="button"
            onClick={async () => {
              // Tentative de connexion avec Google
              const { error } = await signInWithGoogle()
              if (error) {
                setError(error.message) // Affichage de l'erreur en cas d'échec
              }
            }}
            className="w-full py-3 flex items-center justify-center gap-2 bg-white border-2 border-[#7A4BC7] rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            aria-label="Se connecter avec Google"
          >
            {/* Icône Google */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700">Continuer avec Google</span>
          </button>

          {/* Lien vers la page d'inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              No account yet?{' '}
              <Link to="/signup" className="text-[#7A4BC7] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

