import React from 'react'
import { PageTitleProps } from './interface'

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return <h1 className="text-3xl font-bold">{text}</h1>
}

export default PageTitle
