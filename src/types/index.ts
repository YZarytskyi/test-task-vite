export interface IUser {
  id: string
  name: string
  email: string
  phone: string
  position: string
  position_id: string
  registration_timestamp: number
  photo: string
}

export interface UsersResponse {
  success: boolean
  page: number
  total_pages: number
  total_users: number
  count: number
  links: {
    next_url: string | null
    prev_url: string | null
  }
  users: IUser[]
}

export interface IPosition {
  id: number
  name: string
}

export interface PositionsResponse {
  success: boolean
  positions: IPosition[]
}

export interface IFormInputs {
  name: string
  email: string
  phone: string
  position_id: string
  photo: FileList
}

export interface TokenResponse {
  success: boolean
  token: string
}

interface SignUpResponseSuccess {
  success: boolean
  user_id: number
  message: 'New user successfully registered'
}

type Fails = Partial<Record<keyof IFormInputs, string[]>>

interface SignUpResponseError {
  success: boolean
  message: string
  fails?: Fails
}

export type SignUpResponse = SignUpResponseSuccess | SignUpResponseError