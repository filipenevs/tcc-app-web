import React, { useState } from 'react'

import ConfirmModal from '../ConfirmModal/ConfirmModal'

import { UserDeleteButtonProps } from './interface'
import UsersService from '../../api/services/users'
// import { useAppDispatch } from '../../hooks/redux'
// import { deleteUser as deleteUserAction } from '../../store/reducers/users'

const UserDeleteButton: React.FC<UserDeleteButtonProps> = ({ userId }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  // const dispatch = useAppDispatch()

  async function handleOnClickDeleteButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.stopPropagation()
    setIsConfirmOpen(true)
  }

  async function deleteUser() {
    setIsConfirmOpen(false)
    await UsersService.deleteUser(userId)
    // dispatch(deleteUserAction(userId))
  }

  function closeConfirmModal() {
    setIsConfirmOpen(false)
  }

  return (
    <>
      {isConfirmOpen && (
        <ConfirmModal
          content="Deseja realmente deletar o registro do usuário selecionado"
          confirmButtonAction={deleteUser}
          cancelButtonAction={closeConfirmModal}
        />
      )}
      <button
        className="rounded-md bg-red-400 hover:bg-red-500 py-2 px-5 font-medium"
        onClick={handleOnClickDeleteButton}
      >
        Excluir
      </button>
    </>
  )
}

export default UserDeleteButton
