import { City, Neighborhood } from '../../typings/address'

export interface NeighborhoodFormProps {
  city?: City
  neighborhood?: Neighborhood
  closeFunction: Function
  stateId?: string
}
