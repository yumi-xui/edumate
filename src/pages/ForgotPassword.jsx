import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import backgroundImage from '../assets/frame 2329 (1).png'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: resetError } = await resetPassword(email)
    
    if (resetError) {
      setError(resetError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
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
            Forgotten your password?
          </h1>
          <p className="text-gray-600 mb-6">
            There is nothing to worry about, we'll send you a message to help you reset your password.
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter personal or work email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent outline-none transition-all bg-white"
              />
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
                Un email de réinitialisation a été envoyé ! Vérifiez votre boîte de réception.
              </div>
            )}

            {/* Bouton Send Reset Link */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-[#CBD83B] text-black rounded-lg font-semibold hover:bg-[#b6c731] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Envoi...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
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

