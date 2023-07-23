import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  sideBarExpanded: boolean
}

const initialState: AppState = {
  sideBarExpanded: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toogleSideBarExpand(state) {
      return {
        ...state,
        sideBarExpanded: !state.sideBarExpanded,
      }
    },
  },
})

export const { toogleSideBarExpand } = appSlice.actions
export default appSlice.reducer
