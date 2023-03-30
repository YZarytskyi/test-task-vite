import axios from 'axios'
import {
  UsersResponse,
  PositionsResponse,
  TokenResponse,
  IFormInputs,
  SignUpResponse,
} from '../types'

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

axios.defaults.baseURL = BASE_URL

export const getUsers = async (page: number) => {
  const { data } = await axios.get<UsersResponse>(`/users?count=6&page=${page}`)
  return data
}

export const getPositions = async () => {
  const { data } = await axios.get<PositionsResponse>('/positions')
  return data
}

export const getToken = async () => {
  const { data } = await axios.get<TokenResponse>('/token')
  return data.token
}

export const formSubmit = async (formData: FormData) => {
  const token = await getToken()
  console.log('token', token)
  const { data } = await axios.post<SignUpResponse>('/users', formData, {
    headers: {
      'Token': token,
    },
  })
  return data
}
