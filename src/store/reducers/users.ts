import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserFilter } from '../../typings/user'

interface UserState {
  data: User[] | null
  loading: boolean
  filter: UserFilter
}

const initialState: UserState = {
  data: null,
  loading: false,
  filter: {
    cpf: '',
    email: '',
    gender: '',
    name: '',
    surname: '',
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initLoading(state) {
      return {
        ...state,
        loading: true,
        data: null,
      }
    },
    insertUsersData(state, action: PayloadAction<User[]>) {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    },
    insertFilter(state, action: PayloadAction<Partial<UserFilter>>) {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    },
    updateUser(state, action: PayloadAction<User>) {
      if (!state.data) return

      const { payload: updatedUser } = action

      return {
        ...state,
        data: state.data.map((oldUser) =>
          oldUser.id === updatedUser.id ? updatedUser : oldUser
        ),
      }
    },
  },
})

export const { initLoading, insertUsersData, insertFilter, updateUser } =
  usersSlice.actions
export default usersSlice.reducer
