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
    selectState(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        selection: {
          state: action.payload,
          city: null,
          neighborhood: null,
        },
      }
    },
    selectCity(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        selection: {
          ...state.selection,
          city: action.payload,
          neighborhood: null,
        },
      }
    },
    selectNeighborhood(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        selection: {
          ...state.selection,
          neighborhood: action.payload,
        },
      }
    },
    removeState(state, action: PayloadAction<string>) {
      if (!state.data) return state

      const newData = state.data.filter(({ id }) => id !== action.payload)

      return {
        ...state,
        data: newData,
      }
    },
    removeCity(state, action: PayloadAction<{ stateId: string; cityId: string }>) {
      if (!state.data) return state

      const { payload } = action
      const { stateId, cityId } = payload

      const newData = state.data.map((currentState) => {
        if (currentState.id !== stateId) return currentState

        return {
          ...currentState,
          cities: currentState.cities.filter(({ id }) => id !== cityId),
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
    removeNeighborhood(
      state,
      action: PayloadAction<{ stateId: string; cityId: string; neighborhoodId: string }>,
    ) {
      if (!state.data) return state

      const { payload } = action
      const { stateId, cityId, neighborhoodId } = payload

      const newData = state.data.map((currentState) => {
        if (currentState.id !== stateId) return currentState

        const newCitiesData = currentState.cities.map((city) => {
          if (city.id !== cityId) return city

          return {
            ...city,
            neighborhoods: city.neighborhoods.filter(({ id }) => id !== neighborhoodId),
          }
        })

        return {
          ...currentState,
          cities: newCitiesData,
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
  },
})

export const {
  insertStatesData,
  selectState,
  selectCity,
  selectNeighborhood,
  removeState,
  removeCity,
  removeNeighborhood,
} = locationsSlide.actions
export default locationsSlide.reducer
