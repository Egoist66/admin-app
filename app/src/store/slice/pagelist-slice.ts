import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AppRootState } from "../store"

type initialStateType = {
     pageList: string[],
     message: string,
     statusCode: 0 | 1,
     status: 'pending' | 'resolved' | 'rejected'
}


const initialState = {
     pageList: [],
     status: 'pending',
     statusCode: 0,
     message: ''
} as initialStateType



export const fetchPages = createAsyncThunk(
     'fetch/pages',
     async (_, { rejectWithValue }) => {
          try {

               const { data } = await axios.get('./api/index.php')
               return data
          }
          catch (e: any) {
               return rejectWithValue(e.message)
          }
 })


export const createPages = createAsyncThunk(
     'create/pages',
     async (formData: FormData, { rejectWithValue, dispatch}) => {
          try {
               const response = await axios.post('./api/newpage.php', formData)
               return response.data

          }
          catch (e) {
               return rejectWithValue(e)
          }
})

export const deletePages = createAsyncThunk(
     'delete/pages',
     async (page: string, { rejectWithValue, dispatch}) => {
          try {
               const response = await axios.post('./api/delete-page.php', {filename: page})
               return response.data

          }
          catch (e) {
               return rejectWithValue(e)
          }
     })


const pageListSlice = createSlice({
     name: 'pagelist',
     initialState,
     reducers: {
          clearMessage(state){
               state.message = ''
          }
     },
     extraReducers(builder) {

          // load pages reducers

          builder.addCase(fetchPages.pending, (state, action) => {
               state.status = 'pending'
          }),

          builder.addCase(fetchPages.fulfilled, (state, action: PayloadAction<string[]>) => {
               state.status = 'resolved';
               state.pageList = [...state.pageList, ...action.payload]

          }),

          builder.addCase(fetchPages.rejected, (state, action) => {
               state.status = 'rejected';
               state.message = action.error.message!

          }),



          // create pages reducers

          builder.addCase(createPages.pending, (state, action) => {
               state.status = 'pending'
          }),

          builder.addCase(createPages.fulfilled, (state, action: PayloadAction<{status: 0 | 1, response: string, files: string[]}>) => {
               state.status = 'resolved'
               state.message = action.payload.response
               state.statusCode = action.payload.status
               state.pageList = !action.payload.files?.length ? [...state.pageList, ...action.payload.files] : [...action.payload.files]
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
               state.pageList = !action.payload.files?.length ? [...state.pageList, ...action.payload.files] : [...action.payload.files]
          }),

          builder.addCase(deletePages.rejected, (state, action) => {
               state.status = 'rejected'
               state.message = `Невозможно удалить текущую страницу!`
          })
     },

})

export const {clearMessage} = pageListSlice.actions
export default pageListSlice.reducer

export const pageListSelector = (state: AppRootState) => state.pageList
