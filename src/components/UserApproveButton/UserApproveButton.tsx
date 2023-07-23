import React, { useState } from 'react'

import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { UserApproveButtonProps } from './interface'
import UsersService from '../../api/services/users'
import { useAppDispatch } from '../../hooks/redux'
import { updateUser } from '../../store/reducers/users'

const UserApproveButton: React.FC<UserApproveButtonProps> = ({ userId }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const dispatch = useAppDispatch()

  async function handleOnClickAprroveButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.stopPropagation()
    setIsConfirmOpen(true)
  }

  async function approveUser() {
    setIsConfirmOpen(false)
    const userData = await UsersService.approveUser(userId)
    dispatch(updateUser(userData))
  }

  function closeConfirmModal() {
    setIsConfirmOpen(false)
  }

  return (
    <>
      {isConfirmOpen && (
        <ConfirmModal
          content="Deseja realmente confirmar a aprovação do usuário selecionado"
          confirmButtonAction={approveUser}
          cancelButtonAction={closeConfirmModal}
        />
      )}
      <button
        className="rounded-md bg-green-400 hover:bg-green-500 py-2 px-5 font-medium"
        onClick={handleOnClickAprroveButton}
      >
        Aprovar Usuário
      </button>
    </>
  )
}

export default UserApproveButton
