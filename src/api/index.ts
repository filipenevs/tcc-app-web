import axios from 'axios'

const HOST = 'http://127.0.0.1'

export const mainApi = axios.create({
  baseURL: `${HOST}:3332`,
})
