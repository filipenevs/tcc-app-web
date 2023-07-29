import { mainApi } from '..'

class StateService {
  static baseUrl = '/states'

  static async getAllStates() {
    try {
      const response = await mainApi.get(`${this.baseUrl}/`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async delete(stateId: string) {
    try {
      const response = await mainApi.delete(`${this.baseUrl}/${stateId}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default StateService
