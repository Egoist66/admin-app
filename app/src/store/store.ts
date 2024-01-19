import {configureStore, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import PageListSliceReducer from './slice/pagelist-slice'
import indexSourceSlice from "./slice/source-slice";


export const store = configureStore({
    reducer: {
        pageList: PageListSliceReducer,
        indexSrc: indexSourceSlice
    }
})


export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()