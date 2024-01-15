import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AppRootState } from "../store"

type initialStateType = {
     sourceData: string | null
     status: 'pending' | 'resolved' | 'rejected'
     statusCode: number
     message: string

}

const initialState = {
     sourceData: null,
     status: 'pending',
     statusCode: 0,
     message: '',

} as initialStateType

export const fetchSourceIndexData = createAsyncThunk(
     'fetch/srcdata', 
     async (url: string, {rejectWithValue}) => {
         
     try {
          const {data} = await axios.get(url)
          return data
     } 
     catch (e: any) {
          return rejectWithValue(e.message)
     }

})

export const createTemplatePage = createAsyncThunk(
     'create/temp', 
     async (html: string, {rejectWithValue}) => {
         
     try {
          const {data} = await axios.post('./api/save-temp-page.php', {html})
          return data
     } 
     catch (e: any) {
          return rejectWithValue(e.message)
     }

})


export const saveEdits = createAsyncThunk(
     'save/edits', 
     async ({html, pagename}: {html: string, pagename: string}, {rejectWithValue}) => {
         
     try {
          const {data} = await axios.post('./api/save-edits.php', {html, pagename})
          return data
     } 
     catch (e: any) {
          return rejectWithValue(e.message)
     }

})

const indexSourceSlice = createSlice({
     name: 'index/source',
     initialState,
     reducers: {},
     extraReducers(builder) {
          builder.addCase(fetchSourceIndexData.pending, (state) => {
               state.status = 'pending'
          }),

          builder.addCase(fetchSourceIndexData.fulfilled, (state, action: PayloadAction<string>) => {
               state.status = 'resolved'
               state.sourceData = action.payload
          }),

          builder.addCase(fetchSourceIndexData.rejected, (state, action) => {
               state.status = 'rejected'
               
          }),


          builder.addCase(createTemplatePage.pending, (state) => {
               state.status = 'pending'
          }),

          builder.addCase(createTemplatePage.fulfilled, (state, action: PayloadAction<{response: string, statusCode: number}>) => {
               state.status = 'resolved'
               state.message = action.payload.response
               state.statusCode = action.payload.statusCode
          }),

          builder.addCase(createTemplatePage.rejected, (state, action) => {
               state.status = 'rejected'
               
               
          })


          builder.addCase(saveEdits.pending, (state) => {
               state.status = 'pending'
          }),

          builder.addCase(saveEdits.fulfilled, (state, action: PayloadAction<{response: string, statusCode: number}>) => {
               state.status = 'resolved'
               state.message = action.payload.response
               state.statusCode = action.payload.statusCode
          }),

          builder.addCase(saveEdits.rejected, (state, action) => {
               state.status = 'rejected'
               
               
          })
     }
})
const selector = (state: AppRootState) => state
export const indexSrcSelector = createSelector(selector, (state) => state.indexSrc)


export default indexSourceSlice.reducer