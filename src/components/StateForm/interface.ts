import { State } from '../../typings/address'

export interface StateFormProps {
  state?: Omit<State, 'cities'>
  isEdit: boolean
  closeFunction: Function
}
