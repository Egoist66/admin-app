import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "./store";
import { Statuses } from "./app-ui-action-slice";


type AuthStateType = {
    status: Statuses,
    statusCode?: 0 | 1,
    isAuth?: boolean
}

type initialStateType = {
   
    auth: AuthStateType   
  
}

const initialState: initialStateType = {
    auth: {
        status: Statuses.IDLE,
        statusCode: 1,
        isAuth: false
    },
 

} 


const appAuthSlice = createSlice({
    name: 'app-auth-slice',
    initialState,
    reducers: {

        setAuth(state, action: PayloadAction<AuthStateType>){
            state.auth.status = action.payload.status
            state.auth.isAuth = action.payload.isAuth
            state.auth.statusCode = action.payload.statusCode
        }
       
    }
})


export default appAuthSlice.reducer
export const {
  setAuth
} = appAuthSlice.actions

const selector = (state: AppRootState) => state.appAuth.auth

export const AuthSelector = createSelector(selector, (state) => state)