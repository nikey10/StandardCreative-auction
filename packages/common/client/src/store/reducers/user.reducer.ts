import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions'

const initialState = {
  walletConnected: false,
  userAddress: '',
  ethBalance: '0'
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        walletConnected: true
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        walletConnected: false,
        userAddress: '',
        ethBalance: '0'
      }

    default:
      return state
  }
}

export default userReducer
