import http from '../../api';

export const ACTIONS = {
  LOGIN: 'SIGNIN_DO_LOGIN',
  LOGOUT: 'SIGNIN_DO_LOGOUT',
  RESET: 'SIGN_RESET_LOGIN_ATTEMPT'
}

const INITIAL_STATE = {
  err: null
}

export const SignInReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.LOGIN:
      if (action.err) {
        return {
          ...state,
          err: action.err
        }
      }

      localStorage.setItem('logged_user', JSON.stringify(action.user_data))
      return {
        ...state,
        err: action.err
      }
    case ACTIONS.LOGOUT:
      localStorage.removeItem('logged_user')
      return {...state, ...INITIAL_STATE}
    case ACTIONS.RESET:
      return {...state, ...INITIAL_STATE}
    default:
      return {...state}
  }
}

export const login = (credentials) => {
  return dispatch => {
    http.post('/login', {auth: credentials})
      .then( response => {
        dispatch({
          type: ACTIONS.LOGIN,
          user_data: response.data,
          err: false
        })
      })
      .catch( response => {
        dispatch({
          type: ACTIONS.LOGIN,
          err: true
        })
      })
  }
}

export const resetLoginAttempt = () => {
  return {
    type: ACTIONS.RESET
  }
}

export const logout = () => {
  return {
    type: ACTIONS.LOGOUT
  }
}
