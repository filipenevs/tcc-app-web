import React from 'react'

import { UserCardProps } from './interface'
import UserApprovedLabel from '../UserApprovedLabel/UserApprovedLabel'
import UserApproveButton from '../UserApproveButton/UserApproveButton'

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  surname,
  email,
  cpf,
  approved,
}) => {
  return (
    <div className="grid grid-cols-6 p-3 rounded-lg border-4 border-slate-300 hover:bg-slate-300 cursor-pointer font-medium items-center">
      <span>
        {name} {surname}
      </span>
      <span>{email}</span>
      <span>{cpf}</span>
      <span>
        <UserApprovedLabel approved={approved} />
      </span>
      <div className="col-span-2 flex justify-end gap-3">
        {!approved && <UserApproveButton userId={id} />}
        <button className="rounded-md bg-gray-300 hover:bg-gray-400 py-2 px-5 font-medium">
          Editar
        </button>
      </div>
    </div>
  )
}

export default UserCard
