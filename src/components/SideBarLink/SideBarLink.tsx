import React from 'react'
import { Link } from 'react-router-dom'

import { SideBarLinkProps } from './interface'
import { useAppSelector } from '../../hooks/redux'
import SideBarIcon from '../SideBarIcon/SideBarIcon'

const SideBarLink: React.FC<SideBarLinkProps> = ({ label, link, icon }) => {
  const { sideBarExpanded } = useAppSelector(({ app }) => app)

  return (
    <Link
      className="p-4 flex items-center bg-slate-200 rounded-2xl gap-3 hover:bg-slate-300"
      to={link}
    >
      <SideBarIcon icon={icon} /> {sideBarExpanded && label}
    </Link>
  )
}

export default SideBarLink
