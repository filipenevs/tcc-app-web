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

  static async add(name: string, uf: string) {
    try {
      const response = await mainApi.post(`${this.baseUrl}/`, {
        name,
        uf,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async update(stateId: string, name: string, uf: string) {
    try {
      const response = await mainApi.put(`${this.baseUrl}/${stateId}`, {
        name,
        uf,
      })
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
