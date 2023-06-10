import React from 'react'
import { PageContainerProps } from './interface'

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex">
      <div className="p-5 bg-slate-300 grow rounded-2xl flex flex-col">{children}</div>
    </div>
  )
}

export default PageContainer
