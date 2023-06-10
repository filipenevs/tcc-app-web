import React from 'react'
import { ConfirmModalProps } from './interface'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = 'Confirmação de Ação',
  content,
  cancelButtonAction,
  confirmButtonAction,
  cancelButtonText = 'Cancelar',
  confirmButtonText = 'Confirmar',
}) => {
  function handleOnClickConfirmButton() {
    confirmButtonAction()
  }

  function handleOnClickCancelButton() {
    cancelButtonAction()
  }

  return (
    <ModalWrapper closeFunction={cancelButtonAction}>
      <div className="flex flex-col gap-5">
        <span className="text-xl font-bold">{title}</span>
        <span>{content}</span>
        <div className="flex justify-end gap-3">
          <button
            className="rounded-md bg-red-500 text-white hover:bg-red-600 py-2 px-5 font-medium"
            onClick={handleOnClickCancelButton}
          >
            {cancelButtonText}
          </button>
          <button
            className="rounded-md bg-green-500 text-white hover:bg-green-600 py-2 px-5 font-medium"
            onClick={handleOnClickConfirmButton}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ConfirmModal
