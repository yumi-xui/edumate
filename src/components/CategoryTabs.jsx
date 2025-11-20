import { useState } from 'react'

export default function CategoryTabs({ 
  tabs = ['mes groupes', 'explore more'],
  activeTab: controlledActiveTab,
  onTabChange,
  onCreateClick
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0])
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  const handleTabClick = (tab) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tab)
    }
    onTabChange && onTabChange(tab)
  }

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-[#FFFEEC]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-serif-display text-black tracking-wide">
            Category
          </span>
          <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-edumate-purple-dark text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
          </div>
        </div>
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-white text-[#7A4BC7] border-2 border-[#7A4BC7] rounded-lg font-semibold hover:bg-[#7A4BC7] hover:text-white transition-colors"
          >
            + creer grp
          </button>
        )}
      </div>
    </div>
  )
}

