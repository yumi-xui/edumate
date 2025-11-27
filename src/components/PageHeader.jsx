import SearchBar from './SearchBar'

export default function PageHeader({ 
  greeting = "Bonjour [Prénom] !",
  onSearch,
  searchPlaceholder = "Rechercher..."
}) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} />
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-800">{greeting}</h2>
        </div>
      </div>
    </div>
  )
}
