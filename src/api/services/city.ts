import { mainApi } from '..'
import { City } from '../../typings/address'

class CityService {
  static baseUrl = '/cities'

  static async add(name: string, stateId: string) {
    try {
      const response = await mainApi.post(`${this.baseUrl}/`, {
        name,
        stateId,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async update(city: City) {
    try {
      const response = await mainApi.put(`${this.baseUrl}/${city.id}`, {
        ...city,
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
