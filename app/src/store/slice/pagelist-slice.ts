import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { log } from "console"

type initialStateType = {
     pageList: string[]
     status: 'pending' | 'resolved' | 'rejected'
}


const initialState = {
     pageList: [],
     status: 'pending'
} as initialStateType



export const fetchPages = createAsyncThunk(
     'fetch/pages',
     async (_, { rejectWithValue }) => {
          try {

               const { data } = await axios.get('./api/index.php')

               return data
          }
          catch (e: any) {
               rejectWithValue(e.message)
          }
})


export const createPages = createAsyncThunk(
     'create/pages',
     async (_, { rejectWithValue }) => {
          try {

          }
          catch (e) {

          }
})


const pageListSlice = createSlice({
     name: 'pagelist',
     initialState,
     reducers: {},
     extraReducers(builder) {
          builder.addCase(fetchPages.pending, (state, action) => {
               state.status = 'pending'
          }),

               builder.addCase(fetchPages.fulfilled, (state, action: PayloadAction<string[]>) => {
                    state.status = 'resolved';
                    console.log(action.payload);

                    state.pageList = [...state.pageList, ...action.payload]

               })
     },

})

export const { } = pageListSlice.actions
export default pageListSlice.reducer