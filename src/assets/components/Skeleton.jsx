import React from 'react'

const Skeleton = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
    <div className="animate-shimmer bg-gray-300 h-6 rounded w-3/4 mb-4 relative overflow-hidden"></div>
    <div className="animate-shimmer bg-gray-300 h-4 rounded w-1/2 mb-4 relative overflow-hidden"></div>
  </div>
  )
}

export default Skeleton
  