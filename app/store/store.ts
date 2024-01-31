import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import appUiActionSlice from "./app-ui-action-slice";



export const store = configureStore({
    reducer: {
        appUI: appUiActionSlice
    }
})


export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()