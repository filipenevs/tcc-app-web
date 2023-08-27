import { mainApi } from '..'
import { Neighborhood } from '../../typings/address'

class NeighborhoodService {
  static baseUrl = '/neighborhoods'

  static async add(name: string, cityId: string) {
    try {
      const response = await mainApi.post(`${this.baseUrl}/`, {
        name,
        cityId,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async update(neighborhood: Neighborhood) {
    try {
      const response = await mainApi.put(`${this.baseUrl}/${neighborhood.id}`, {
        ...neighborhood,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async delete(neighborhoodId: string) {
    try {
      const response = await mainApi.delete(`${this.baseUrl}/${neighborhoodId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default NeighborhoodService
