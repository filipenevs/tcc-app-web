import React from 'react'

import { LoadingSpinnerProps } from './interface'

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  return (
    <div className="flex grow justify-center items-center">
      <div className="h-24 w-24 border-8 rounded-full border-slate-400 border-t-slate-500 animate-spin" />
    </div>
  )
}

export default LoadingSpinner
