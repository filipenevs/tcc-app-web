import { City, State } from '../../typings/address'

export interface CityFormProps {
  state?: State
  city?: City
  closeFunction: Function
}
