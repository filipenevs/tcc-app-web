import { mainApi } from '..'

class UsersService {
  static baseUrl = '/users'

  static async getAllUsers() {
    try {
      const response = await mainApi.get(`${this.baseUrl}/`)
      return response.data
    } catch (error) {
      console.log(error)
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
