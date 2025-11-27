import { Link, useLocation } from 'react-router-dom';

export default function SearchBar({ placeholder = "Rechercher...", onSearch }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isFeaturesPage = location.pathname === '/generer-quiz';

  return (
    <div className="flex-1 max-w-4xl mx-4">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1 border-r border-gray-200 pr-4">
          <Link
            to="/"
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              isHomePage
                ? 'text-violet-600 bg-violet-50 rounded-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg'
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/generer-quiz"
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              isFeaturesPage
                ? 'text-violet-600 bg-violet-50 rounded-lg'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg'
            }`}
          >
            Fonctionnalités
          </Link>
        </div>
        
        <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        </div>
      </div>
    </div>
  )
}


