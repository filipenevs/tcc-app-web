import React from 'react'
import { PageContainerProps } from './interface'

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex">
      <div className="m-5 p-5 bg-slate-200 grow rounded-2xl">{children}</div>
    </div>
  )
}

export default PageContainer
