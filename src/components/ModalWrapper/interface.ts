import { ReactNode } from 'react'

export interface ModalWrapperProps {
  children: ReactNode
  closeFunction: Function
  preventCloseOnOverlayClick?: boolean
  onOverlayClick?: Function
}
