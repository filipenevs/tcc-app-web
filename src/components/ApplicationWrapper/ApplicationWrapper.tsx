import React from 'react'
import { ApplicationWrapperProps } from './interface'

const PageContainer: React.FC<ApplicationWrapperProps> = ({ children }) => {
  return (
    <div className="h-screen w-full flex">
      <div className="p-5 grow rounded-2xl flex flex-col gap-5">{children}</div>
    </div>
  )
}

export default PageContainer
