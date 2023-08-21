import { mainApi } from '..'

class NeighborhoodService {
  static baseUrl = '/neighborhoods'

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
