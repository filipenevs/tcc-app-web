import React, { useState } from 'react'

import ModalWrapper from '../ModalWrapper'

import styles from './style.module.css'

import { ApproveModalProps } from './interface'
import UsersService from '../../api/services/users'

const ApproveModal: React.FC<ApproveModalProps> = ({
  closeFunction,
  userId,
  setUserFunction,
}) => {
  const [rejectReason, setRejectReason] = useState('')
  const [disabled, setDisabled] = useState(false)

  function handleOnChangeRejectReason({ target }: React.ChangeEvent<HTMLInputElement>) {
    setRejectReason(target.value)
  }

  function handleOnClickApprove() {
    setDisabled(true)
    UsersService.changeStatus(userId, 'approved').then((response) => {
      setUserFunction(response)
      closeFunction()
    })
  }

  function handleOnClickReject() {
    setDisabled(true)
    UsersService.changeStatus(userId, 'rejected', rejectReason).then((response) => {
      setUserFunction(response)
      closeFunction()
    })
  }

  return (
    <ModalWrapper closeFunction={closeFunction}>
      <div className={`${styles.modal} flex flex-col gap-5 justify-between`}>
        <span className="text-xl font-bold">Validar usuário</span>
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <div className=" flex flex-col items-center border-2 border-gray-500 rounded-lg p-4">
            <p className="font-medium mb-2">Foto documento</p>
            <img
              className="h-full object-contain max-h-96"
              src={`http://127.0.0.1:3333/images/documentImage-${userId}.jpeg`}
            />
          </div>

          <div className="flex flex-col items-center border-2 border-gray-500 rounded-lg p-4">
            <p className="font-medium mb-2">Foto usuário</p>
            <img
              className="h-full object-contain max-h-96"
              src={`http://127.0.0.1:3333/images/personImage-${userId}.jpeg`}
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex w-full gap-2">
            <input
              className="px-3 border-0 h-full flex-grow rounded-ld shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              placeholder="Motivo (apenas em caso de rejeição)"
              type="text"
              value={rejectReason}
              onChange={handleOnChangeRejectReason}
              maxLength={255}
            />
            <button
              className="rounded-md bg-red-500 hover:bg-red-600 py-2 px-5 font-medium text-white"
              onClick={handleOnClickReject}
              disabled={disabled}
            >
              Rejeitar Usuário
            </button>
          </div>
          <button
            className="rounded-md bg-green-500 hover:bg-green-600 py-2 px-5 font-medium text-white"
            onClick={handleOnClickApprove}
            disabled={disabled}
          >
            Aprovar Usuário
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ApproveModal
