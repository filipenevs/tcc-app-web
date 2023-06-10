import React from 'react'
import { ApplicationWrapperProps } from './interface'

const PageContainer: React.FC<ApplicationWrapperProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex">
      <div className="m-5 p-5 bg-slate-200 grow rounded-2xl flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}

export default PageContainer
