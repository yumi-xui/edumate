import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import backgroundImage from '../assets/frame 2329 (1).png'

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!agreeToTerms) {
      setError('Vous devez accepter les conditions pour continuer')
      return
    }

    setError(null)
    setLoading(true)

    const { data, error: signUpError } = await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    )
    
    if (signUpError) {
      console.error('Sign up error in component:', signUpError)
      setError(signUpError.message || 'Une erreur est survenue lors de l\'inscription')
      setLoading(false)
    } else {
      // Vérifier si l'utilisateur a été créé (même si l'email doit être confirmé)
      if (data?.user) {
        setUserData(data)
        setSuccess(true)
        setError(null)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="absolute left-0 right-0 -top-10 z-0"
        style={{ width: 'auto', height: 'auto', maxWidth: 'none', maxHeight: 'none' }}
      />

      {/* Carte de formulaire */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#FFF8E7] rounded-2xl shadow-2xl p-8">
          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign Up Free
          </h1>
          <p className="text-gray-600 mb-6">
            14 day free access to unlimited resources
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name et Last Name côte à côte */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Placeholder"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Placeholder"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Placeholder"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Placeholder"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#7A4BC7] border-gray-300 rounded focus:ring-[#7A4BC7]"
                />
                <span className="ml-2 text-sm text-gray-700">
                I agree with the terms and conditions
                </span>
              </label>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Message de succès */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                <div className="font-semibold mb-1">Compte créé avec succès !</div>
                {userData?.user?.email_confirmed_at === null && (
                  <div className="mt-2 text-xs">
                    Un email de confirmation a été envoyé à {formData.email}. 
                    Veuillez vérifier votre boîte de réception et cliquer sur le lien pour confirmer votre compte.
                  </div>
                )}
                <div className="mt-2 text-xs">Redirection vers la page de connexion...</div>
              </div>
            )}

            {/* Bouton Sign Up */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-[#7A4BC7] text-white rounded-lg font-semibold hover:bg-[#6a3fb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Création...' : 'Sign up'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#7A4BC7] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

