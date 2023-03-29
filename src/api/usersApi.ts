import axios from 'axios'
import { UsersResponse } from '../types'

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

axios.defaults.baseURL = BASE_URL

export const getUsers = async (page: number) => {
  const { data } = await axios.get<UsersResponse>(`/users?count=6&page=${page}`)
  return data
}
