import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { State } from '../../typings/address'

interface AddressState {
  data: State[] | null
  loading: boolean
}

const initialState: AddressState = {
  data: null,
  loading: false,
}

const locationsSlide = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    initLoading(state) {
      return {
        ...state,
        loading: true,
        data: null,
      }
    },
    insertStatesData(state, action: PayloadAction<State[]>) {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    },
  },
})

export const { insertStatesData } = locationsSlide.actions
export default locationsSlide.reducer
