import React from 'react'

import { SideBarIconProps } from './interface'

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon: Icon }) => {
  return (
    <span className="text-2xl">
      <Icon />
    </span>
  )
}

export default SideBarIcon
