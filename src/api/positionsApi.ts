import axios from 'axios'
import { PositionsResponse } from '../types'

export const getPositions = async () => {
  const { data } = await axios.get<PositionsResponse>('/positions')
  return data
}
