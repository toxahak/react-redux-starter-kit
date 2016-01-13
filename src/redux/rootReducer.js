import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import auth from './modules/auth'

export default combineReducers({
  counter,
  auth,
  router
})
