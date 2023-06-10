import React from 'react'

import { UserApprovedLabelProps } from './interface'

const UserApprovedLabel: React.FC<UserApprovedLabelProps> = ({ approved }) => {
  return (
    <span className={`${approved ? 'text-green-500' : 'text-red-500'}`}>
      {approved ? 'Aprovado' : 'Não Aprovado'}
    </span>
  )
}

export default UserApprovedLabel
