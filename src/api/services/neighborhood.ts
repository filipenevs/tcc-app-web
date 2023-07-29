import { mainApi } from '..'

class NeighborhoodService {
  static baseUrl = '/neighborhoods'

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
