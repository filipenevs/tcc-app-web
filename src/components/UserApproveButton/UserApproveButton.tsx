import React from 'react'

import { UserApproveButtonProps } from './interface'
import UsersService from '../../api/services/users'
import { useAppDispatch } from '../../hooks/redux'
import { updateUser } from '../../store/reducers/users'

const UserApproveButton: React.FC<UserApproveButtonProps> = ({ userId }) => {
  const dispatch = useAppDispatch()

  async function handleOnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()

    const userData = await UsersService.approveUser(userId)

    dispatch(updateUser(userData))
  }

  return (
    <button
      className="rounded-md bg-green-300 hover:bg-green-400 py-2 px-5 font-medium"
      onClick={handleOnClick}
    >
      Aprovar Usuário
    </button>
  )
}

export default UserApproveButton
