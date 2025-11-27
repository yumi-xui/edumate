export default function UserProfileCard({ userName = "Katib Rihab", status = "Connected" }) {
  return (
    <div className="bg-[#97A87A] rounded-2xl p-3 text-black max-w-xs">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-black text-sm">{userName}</p>
          <span className="block mt-1 text-xs font-semibold text-black">
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}

