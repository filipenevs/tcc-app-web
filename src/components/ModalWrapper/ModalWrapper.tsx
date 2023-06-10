import React from 'react'
import { ModalWrapperProps } from './interface'

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  closeFunction,
  onOverlayClick,
  preventCloseOnOverlayClick,
}) => {
  function handleOnOverlayClick({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (currentTarget !== target) return

    if (!preventCloseOnOverlayClick) closeFunction()
    else onOverlayClick && onOverlayClick()
  }

  return (
    <div
      className="absolute w-full h-full bg-black bg-opacity-30 top-0 right-0 flex justify-center items-center cursor-default"
      onClick={handleOnOverlayClick}
    >
      <div className="bg-white p-5 rounded-xl">{children}</div>
    </div>
  )
}

export default ModalWrapper
