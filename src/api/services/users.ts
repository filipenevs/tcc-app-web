import { mainApi } from '..'

class UsersService {
  static async getAllUsers() {
    try {
      const response = await mainApi.get('/users/')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async approveUser(userId: string) {
    try {
      const response = await mainApi.post(`/users/aproveUser/${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default UsersService
