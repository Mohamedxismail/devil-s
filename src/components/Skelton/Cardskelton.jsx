import React from 'react'

export default function Cardskelton() {
  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-800 w-full aspect-2/3 max-w-sm mx-auto">
      <div className="animate-pulse bg-gray-800 h-48 w-full rounded-lg mb-4"></div>
      <div className="space-y-2 mb-3">
        <div className="animate-pulse h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="animate-pulse h-4 bg-gray-800 rounded w-1/2"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="animate-pulse h-6 bg-gray-800 rounded w-1/4"></div>
        <div className="animate-pulse h-8 bg-gray-800 rounded-full w-24"></div>
      </div>
    </div>
    </div>
  )
}
