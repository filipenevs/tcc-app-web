import { mainApi } from '..'

class CityService {
  static baseUrl = '/cities'

  static async add(name: string) {
    try {
      const response = await mainApi.post(`${this.baseUrl}/`, {
        name,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async delete(cityId: string) {
    try {
      const response = await mainApi.delete(`${this.baseUrl}/${cityId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default CityService
