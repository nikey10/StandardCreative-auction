import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constant'
interface User {
  address: string
}

export const login = (user: User, network: string) => {
  return {
    type: LOGIN_SUCCESS,
    address: user.address,
    network
  }
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
