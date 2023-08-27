import React from 'react'

import styles from './style.module.css'

import { PageWrapperProps } from './interface'

const PageContainer: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className={`w-full flex ${styles.pageWrapper}`}>
      <div className="p-5 bg-slate-100 grow rounded-2xl flex gap-5">{children}</div>
    </div>
  )
}

export default PageContainer
