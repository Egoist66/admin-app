import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "../store";
type initialStateType = {
     status: 'idle' | 'initializing' | 'settled'
}

const initialState: initialStateType = {
     status: 'idle'
}

const AppInitSlice = createSlice({
     name: 'app-init-slice',
     initialState,
     reducers: {
          appInitAction(state, action: PayloadAction<{status: initialStateType['status']}>){
               state.status = action.payload.status
          }
     }
})

export const {appInitAction} = AppInitSlice.actions
const selector = (state: AppRootState) => state
export const appInitSelector = createSelector(selector, (state) => state.appInit)

export default AppInitSlice.reducer