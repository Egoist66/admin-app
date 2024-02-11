import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "./store";
import { Statuses } from "./app-ui-action-slice";


export type AuthStateType = {
    status: Statuses,
    statusCode?: 0 | 1,
    isAuth?: boolean
}

export type LoginStateType = {
    status: Statuses.IDLE
    response: string,
    statusCode: 0 | 1
}

type initialStateType = {
   
    auth: AuthStateType
    login: LoginStateType 
  
}

const initialState: initialStateType = {
    auth: {
        status: Statuses.IDLE,
        statusCode: 1,
        isAuth: false
    },

    login: {
        status: Statuses.IDLE,
        response: "",
        statusCode: 1
    }
} 


const appAuthSlice = createSlice({
    name: 'app-auth-slice',
    initialState,
    reducers: {

        setAuth(state, action: PayloadAction<AuthStateType>){
            state.auth.status = action.payload.status
            state.auth.isAuth = action.payload.isAuth
            state.auth.statusCode = action.payload.statusCode
        },

        setLogin(state, action: PayloadAction<LoginStateType>){
            state.login.response = action.payload.response
            state.login.status = action.payload.status
            state.login.statusCode = action.payload.statusCode
        }
       
    }
})


export default appAuthSlice.reducer
export const {
  setAuth,
  setLogin
} = appAuthSlice.actions

const selector = (state: AppRootState) => state.appAuth.auth

export const AuthSelector = createSelector(selector, (state) => state)