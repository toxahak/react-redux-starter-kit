import { createAction, handleActions } from 'redux-actions'
import { saveToken, decodeToken } from '../utils/authToken.js'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_CURRENT_USER_PENDING = 'LOAD_CURRENT_USER_PENDING'
export const LOAD_CURRENT_USER_ERROR = 'LOAD_CURRENT_USER_ERROR'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
export const AUTH_DISCARD_TOKEN = 'AUTH_DISCARD_TOKEN'
export const AUTH_SET_USER = 'AUTH_SET_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const login = function (data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {data})
  }
}

export const loginSuccess = function ({ auth_token }) {
  return (dispatch) => {
    saveToken(auth_token)
    dispatch(authSetToken(auth_token))
    dispatch(loadCurrentUser(decodeToken(auth_token).id))
  }
}
export const loadCurrentUser = function (id) {
  return {
    types: [LOAD_CURRENT_USER_PENDING, AUTH_SET_USER, LOAD_CURRENT_USER_ERROR],
    url: `/users/${id}`
  }
}
export const authSetToken = createAction(AUTH_SET_TOKEN)
export const authDiscardToken = createAction(AUTH_DISCARD_TOKEN)
export const authSetUser = createAction(AUTH_SET_USER)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  LOGIN_FAIL: (state, { error }) => ({
    ...state,
    loginErrors: error
  }),
  AUTH_SET_TOKEN: (state, { payload }) => ({
    ...state,
    token: payload
  }),
  AUTH_DISCARD_TOKEN: (state, { payload }) => ({
    token: null,
    user: null
  }),
  AUTH_SET_USER: (state, { payload }) => ({
    ...state,
    user: payload
  })
}, {
  token: null,
  user: null
})
