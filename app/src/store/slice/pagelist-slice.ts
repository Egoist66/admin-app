import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AppRootState } from "../store"

type initialStateType = {
     files: string[],
     message: string,
     statusCode: 0 | 1,
     status: 'pending' | 'resolved' | 'rejected'
}


const initialState = {
     files: [],
     status: 'pending',
     statusCode: 0,
     message: ''
} as initialStateType



export const fetchPages = createAsyncThunk(
     'fetch/pages',
     async (_, { rejectWithValue }) => {
     try {

          const { data } = await axios.get('./api/fetch-pages.php')
          return data
     }
     catch (e: any) {
          return rejectWithValue(e.message)
     }
})


export const createPages = createAsyncThunk(
     'create/pages',
     async (formData: FormData, { rejectWithValue}) => {
     try {
          const response = await axios.post('./api/new-page.php', formData)
          return response.data

     }
     catch (e) {
          return rejectWithValue(e)
     }
})

export const deletePages = createAsyncThunk(
     'delete/pages',
     async (page: string, { rejectWithValue}) => {
          try {
               const response = await axios.post('./api/delete-page.php', {filename: page})
               return response.data

          }
          catch (e) {
               return rejectWithValue(e)
          }
     })


const filesSlice = createSlice({
     name: 'pages/files',
     initialState,
     reducers: {
          clearMessage(state){
               state.message = ''
          }
     },
     extraReducers(builder) {

          // load pages reducers

          builder.addCase(fetchPages.pending, (state) => {
               state.status = 'pending'
          }),

          builder.addCase(fetchPages.fulfilled, (state, action: PayloadAction<string[]>) => {
               state.status = 'resolved';
               state.files = [...state.files, ...action.payload]

          }),

          builder.addCase(fetchPages.rejected, (state, action) => {
               state.status = 'rejected';
               state.message = action.error.message!

          }),



          // create pages reducers

          builder.addCase(createPages.pending, (state) => {
               state.status = 'pending'
          }),

          builder.addCase(createPages.fulfilled, (state, action: PayloadAction<{status: 0 | 1, response: string, files: string[]}>) => {
               state.status = 'resolved'
               state.message = action.payload.response
               state.statusCode = action.payload.status
               state.files = !action.payload.files.length ? [...state.files, ...action.payload.files] : [...action.payload.files]
          }),

          builder.addCase(createPages.rejected, (state, action) => {
               state.status = 'rejected'
               state.message = action.error.message!
          })


          // delete pages reducers

          builder.addCase(deletePages.pending, (state, action) => {
               state.status = 'pending'
          }),

          builder.addCase(deletePages.fulfilled, (state, action: PayloadAction<{status: 0 | 1, response: string, files: string[]}>) => {
               state.status = 'resolved'
               state.message = action.payload.response
               state.statusCode = action.payload.status
               state.files = !action.payload.files?.length ? [...state.files, ...action.payload.files] : [...action.payload.files]

          }),

          builder.addCase(deletePages.rejected, (state, action) => {
               state.status = 'rejected'
               state.message = `Невозможно удалить текущую страницу!`
          })
     },

})

export const {clearMessage} = filesSlice.actions
export default filesSlice.reducer


export const selector = (state: AppRootState) => state
export const filesSelector = createSelector(selector, (state) => state.pageList)

