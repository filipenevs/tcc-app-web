import React from 'react'
import { UserProfileFormSectionContainerProps } from './interface'

const UserProfileFormSectionContainer: React.FC<UserProfileFormSectionContainerProps> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-semibold">{title}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

export default UserProfileFormSectionContainer
