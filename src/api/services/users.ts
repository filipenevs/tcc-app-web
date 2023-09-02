import { mainApi } from '..'

export interface UserFilters extends Record<string, any> {
  page?: number
  perPage?: number
  orderBy?: string
  order?: 'asc' | 'desc'
}

class UsersService {
  static baseUrl = '/users'

  static async getAllUsers(filters: UserFilters) {
    try {
      const params = new URLSearchParams(filters)

      const response = await mainApi.get(`${this.baseUrl}/?${params.toString()}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async getById(userId: string) {
    try {
      const response = await mainApi.get(`${this.baseUrl}/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async approveUser(userId: string) {
    try {
      const response = await mainApi.post(`${this.baseUrl}/aproveUser/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteUser(userId: string) {
    try {
      const response = await mainApi.delete(`${this.baseUrl}/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default UsersService
