import { Address } from './address'

export interface User {
  id: string
  name: string
  surname: string
  email: string
  password: string
  cpf: string
  gender: string
  birthDate: string
  createdAt: string
  addressId: string
  preferenceId: string | null
  preference?: Preferences
  houses: House[]
  status: Status
}

export interface House {
  id: string
  metersBuilt: string
  address: Address
  animals: boolean
}

export interface Preferences {
  id: string
  animals: boolean
  maximumMetersBuilt: number
  neighborhoods: any[]
}

export type Status = 'pending' | 'rejected' | 'approved'
