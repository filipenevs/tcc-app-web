import { combineReducers, configureStore } from '@reduxjs/toolkit'

import users from './reducers/users'

const reducer = combineReducers({
  users,
})

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
