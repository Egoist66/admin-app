import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import appUiActionSlice from "./app-ui-action-slice";
import appAuthSlice from "./app-auth-slice";



export const store = configureStore({
    reducer: {
        appUI: appUiActionSlice,
        appAuth: appAuthSlice
    }
})


export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()