import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  sideBarExpanded: boolean
}

const initialState: AppState = {
  sideBarExpanded: true,
}

const usersSlice = createSlice({
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

export const { toogleSideBarExpand } = usersSlice.actions
export default usersSlice.reducer
