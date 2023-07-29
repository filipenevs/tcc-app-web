import { useEffect } from 'react'
import { FaHouse, FaUsers, FaLocationDot } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'

import SideBarLink from '../SideBarLink'
import SideBarExpand from '../SideBarExpand/SideBarExpand'
import { useAppSelector } from '../../hooks/redux'

const links = [
  {
    label: 'Home',
    link: '/',
    icon: FaHouse,
  },
  {
    label: 'Usuários',
    link: '/users',
    icon: FaUsers,
  },
  {
    label: 'Localidades',
    link: '/locations',
    icon: FaLocationDot,
  },
] as const

const SideBar = () => {
  const { pathname } = useLocation()
  const { sideBarExpanded } = useAppSelector(({ app }) => app)

  useEffect(() => {
    const currentLink = links.find(({ link }) => link === pathname)

    document.title = `Sparklly Admin${currentLink ? ` - ${currentLink.label}` : ''}`
  }, [pathname])

  return (
    <aside className={classNames('flex flex-col gap-4', { 'w-52': sideBarExpanded })}>
      {links.map(({ label, link, icon }) => (
        <SideBarLink key={link} label={label} link={link} icon={icon} />
      ))}
      <SideBarExpand />
    </aside>
  )
}

export default SideBar
