import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wbvqcacgoluzuvgrtjpi.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidnFjYWNnb2x1enV2Z3J0anBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTUxODksImV4cCI6MjA3ODAzMTE4OX0.lGUXebsnt_hSMRdhahuxrbc0dhc19GfqRzOw1pQSu6E'

// Vérifier que les credentials sont valides
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials are missing!')
  console.error('Supabase URL:', supabaseUrl || 'NOT SET')
  console.error('Supabase Key:', supabaseAnonKey ? 'Present' : 'NOT SET')
} else {
  console.log('✅ Supabase credentials loaded')
  console.log('Supabase URL:', supabaseUrl)
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Test de connexion au démarrage
supabase.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase connection error:', error.message)
    } else {
      console.log('✅ Supabase connected successfully')
      if (data.session) {
        console.log('📝 Active session found for user:', data.session.user.email)
      } else {
        console.log('ℹ️ No active session')
      }
    }
  })
  .catch((error) => {
    console.error('❌ Failed to initialize Supabase:', error)
  })

