import GroupIcon from './GroupIcon'

export default function GroupCard({ 
  title, 
  description, 
  members, 
  resources, 
  onConsultClick,
  icon 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Group Icon */}
        <div className="w-14 h-14 bg-edumate-purple rounded-2xl flex items-center justify-center flex-shrink-0">
          {icon || <GroupIcon size={48} />}
        </div>

        {/* Group Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            {members !== undefined && <span>Membres: {members}</span>}
            {resources !== undefined && <span>Ressources: {resources}</span>}
          </div>
        </div>

        {/* Action Button */}
        {onConsultClick && (
          <button
            onClick={onConsultClick}
            className="px-6 py-2 bg-[#CBD83B] text-black rounded-lg font-medium hover:bg-[#b6c731] transition-colors flex-shrink-0"
          >
            consulter
          </button>
        )}
      </div>
    </div>
  )
}

