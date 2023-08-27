import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { City, Neighborhood, State } from '../../typings/address'

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
    createState(state, action: PayloadAction<Omit<State, 'cities'>>) {
      if (!state.data) return state

      const newData = [...state.data, { ...action.payload, cities: [] }].sort((a, b) =>
        a.name.localeCompare(b.name),
      )

      return {
        ...state,
        data: newData,
      }
    },
    createCity(state, { payload: city }: PayloadAction<City>) {
      if (!state.data) return state

      const newData = state.data.map((locationState) => {
        if (locationState.id !== city.stateId) return locationState

        const newCities = [...locationState.cities, { ...city, neighborhoods: [] }].sort(
          (a, b) => a.name.localeCompare(b.name),
        )

        return {
          ...locationState,
          cities: newCities,
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
    createNeighborhood(
      state,
      { payload }: PayloadAction<{ neighborhood: Neighborhood; stateId: string }>,
    ) {
      if (!state.data) return state

      const { stateId, neighborhood } = payload

      const newData = state.data.map((locationState) => {
        if (locationState.id !== stateId) return locationState

        const newCitiesData = locationState.cities.map((locationCity) => {
          if (locationCity.id !== neighborhood.cityId) return locationCity

          const newNeighborhoods = [...locationCity.neighborhoods, neighborhood].sort(
            (a, b) => a.name.localeCompare(b.name),
          )

          return {
            ...locationCity,
            neighborhoods: newNeighborhoods,
          }
        })

        return {
          ...locationState,
          cities: newCitiesData,
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
    updateStateData(state, action: PayloadAction<Omit<State, 'cities'>>) {
      if (!state.data) return state

      const { id, name, uf } = action.payload

      const newData = state.data.map((currentState) => {
        if (currentState.id !== id) return currentState

        return {
          ...currentState,
          name,
          uf,
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
    updateCityData(state, action: PayloadAction<Omit<City, 'neighborhood'>>) {
      if (!state.data) return state

      const { stateId } = action.payload

      const newData = state.data.map((currentState) => {
        if (currentState.id !== stateId) return currentState

        return {
          ...currentState,
          cities: currentState.cities.map((city) => {
            if (city.id !== action.payload.id) return city

            return { ...action.payload, neighborhoods: [] }
          }),
        }
      })

      return {
        ...state,
        data: newData,
      }
    },
    updateNeighborhood(
      state,
      { payload }: PayloadAction<{ neighborhood: Neighborhood; stateId: string }>,
    ) {
      if (!state.data) return state

      const { stateId, neighborhood } = payload

      const newData = state.data.map((locationState) => {
        if (locationState.id !== stateId) return locationState

        const newCitiesData = locationState.cities.map((locationCity) => {
          if (locationCity.id !== neighborhood.cityId) return locationCity

          return {
            ...locationCity,
            neighborhoods: locationCity.neighborhoods.map((locationNeighborhood) => {
              if (locationNeighborhood.id !== neighborhood.id) return locationNeighborhood

              return {
                ...locationNeighborhood,
                name: neighborhood.name,
              }
            }),
          }
        })

        return {
          ...locationState,
          cities: newCitiesData,
        }
      })

      return {
        ...state,
        data: newData,
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
  createState,
  createCity,
  createNeighborhood,
  updateStateData,
  updateCityData,
  updateNeighborhood,
  removeState,
  removeCity,
  removeNeighborhood,
} = locationsSlide.actions
export default locationsSlide.reducer
