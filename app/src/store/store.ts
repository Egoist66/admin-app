import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import PageListSliceReducer from './slice/pagelist-slice'
import indexSourceSlice from "./slice/index-source-slice";

const rootReducer = combineReducers({
     pageList: PageListSliceReducer,
     indexSrc: indexSourceSlice
})

export const store = configureStore({
     reducer: rootReducer
})


export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()