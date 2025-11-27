// Composant Logo - Affiche l'image du logo depuis src/assets/
import logoImage from '../assets/Group 2.png'

export default function Logo({ className = "" }) {
  return (
    <div className={className}>
      <img 
        src={logoImage} 
        alt="Edumate Logo" 
        className="w-32 h-auto object-contain max-w-full"
      />
    </div>
  )
}
