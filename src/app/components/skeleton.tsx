import React from 'react'

export default function LoadingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="animate-pulse">
          <div className="h-[200px] bg-gray-200 w-full" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
 