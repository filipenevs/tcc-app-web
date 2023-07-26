import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { State } from '../../typings/address'

interface AddressState {
  data: State[] | null
  loading: boolean
  selection: {
    state: string | null
    city: string | null
    neighborhood: string | null
  }
}

const initialState: AddressState = {
  data: null,
  loading: false,
  selection: {
    state: null,
    city: null,
    neighborhood: null,
  },
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
    selectState(state, action: PayloadAction<string>) {
      return {
        ...state,
        selection: {
          state: action.payload,
          city: null,
          neighborhood: null,
        },
      }
    },
    selectCity(state, action: PayloadAction<string>) {
      return {
        ...state,
        selection: {
          ...state.selection,
          city: action.payload,
          neighborhood: null,
        },
      }
    },
    selectNeighborhood(state, action: PayloadAction<string>) {
      return {
        ...state,
        selection: {
          ...state.selection,
          neighborhood: action.payload,
        },
      }
    },
  },
})

export const { insertStatesData, selectState, selectCity, selectNeighborhood } =
  locationsSlide.actions
export default locationsSlide.reducer
