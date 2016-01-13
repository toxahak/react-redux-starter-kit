import jwtDecode from 'jwt-decode'
import {loadCurrentUser, authSetToken} from '../modules/auth'

const KEY_NAME = 'access-token'

export function initAuth (dispatch) {
  var token = localStorage[KEY_NAME]
  var user
  if (token !== undefined) {
    user = decodeToken(token)
    dispatch(authSetToken(token))
    dispatch(loadCurrentUser(user.id))
  }
}

export function saveToken (token) {
  localStorage[KEY_NAME] = token
}

export function getToken (token) {
  localStorage[KEY_NAME] = token
}

export function clearToken () {
  localStorage.removeItem(KEY_NAME)
}

export function decodeToken (token) {
  return jwtDecode(token).user
}
