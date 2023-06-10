import React from 'react'
import { ModalWrapperProps } from './interface'

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  closeFunction,
  onOverlayClick,
  preventCloseOnOverlayClick,
}) => {
  function handleOnOverlayClick() {
    if (!preventCloseOnOverlayClick) closeFunction()
    else onOverlayClick && onOverlayClick()
  }

  return (
    <div
      className="absolute w-full h-full bg-black bg-opacity-30 top-0 right-0 flex justify-center items-center"
      onClick={handleOnOverlayClick}
    >
      <div className="bg-white p-5 rounded-xl">{children}</div>
    </div>
  )
}

export default ModalWrapper
