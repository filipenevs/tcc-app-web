import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TypeFilterValue, TypeSortInfo } from '@inovua/reactdatagrid-community/types'

interface UserState {
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
  queryOptions: {
    pagination: {
      skip: 0,
      limit: 20,
    },
    filters: [
      { name: 'email', type: 'string', operator: 'eq', value: '' },
      { name: 'name', type: 'string', operator: 'eq', value: '' },
      { name: 'surname', type: 'string', operator: 'eq', value: '' },
      { name: 'cpf', type: 'string', operator: 'eq', value: '' },
      { name: 'gender', operator: 'eq', type: 'select', value: '' },
    ],
    sortInfo: null,
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<Record<string, any>>) {
      return {
        ...state,
        queryOptions: {
          ...state.queryOptions,
          ...action.payload,
        },
      }
    },
  },
})

export const { updateFilter } = usersSlice.actions
export default usersSlice.reducer
