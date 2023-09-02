import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../typings/user'
import { TypeFilterValue, TypeSortInfo } from '@inovua/reactdatagrid-community/types'

interface UserState {
  data: User[] | null
  loading: boolean
  queryOptions: {
    pagination: {
      skip: number
      limit: number
    }
    filters: TypeFilterValue
    sortInfo: TypeSortInfo | null
  }
}

const initialState: UserState = {
  data: null,
  loading: false,
  queryOptions: {
    pagination: {
      skip: 0,
      limit: 20,
    },
    filters: [
      { name: 'email', type: 'string', operator: 'equals', value: '' },
      { name: 'name', type: 'string', operator: 'equals', value: '' },
      { name: 'surname', type: 'string', operator: 'equals', value: '' },
      { name: 'cpf', type: 'string', operator: 'equals', value: '' },
    ],
    sortInfo: null,
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
    updateFilter(state, action: PayloadAction<Record<string, any>>) {
      return {
        ...state,
        queryOptions: {
          ...state.queryOptions,
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
          oldUser.id === updatedUser.id ? updatedUser : oldUser,
        ),
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      if (!state.data) return

      return {
        ...state,
        data: state.data.filter(({ id }) => id !== action.payload),
      }
    },
  },
})

export const { initLoading, insertUsersData, updateFilter, updateUser, deleteUser } =
  usersSlice.actions
export default usersSlice.reducer
