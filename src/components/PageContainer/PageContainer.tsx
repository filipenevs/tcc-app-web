import React from 'react'
import { PageContainerProps } from './interface'

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="h-full flex grow">
      <div className="bg-slate-100 grow rounded-2xl flex flex-col gap-5">{children}</div>
    </div>
  )
}

export default PageContainer
