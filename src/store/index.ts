import { combineReducers, configureStore } from '@reduxjs/toolkit'

import users from './reducers/users'
import app from './reducers/app'
import locations from './reducers/locations'

const reducer = combineReducers({
  users,
  app,
  locations,
})

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
