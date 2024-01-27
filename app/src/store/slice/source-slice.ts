import {PayloadAction, createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {AppRootState} from "../store"
import {delay} from "../../utils/delay";

export enum Statuses {
    IDLE = "IDLE",
    PENDING = "PENDING",
    RESOLVED = "RESOLVED",
    REJECTED = "REJECTED",
}

type initialStateType = {
    sourceData: string | null
    fetchStatus: Statuses
    createStatus: Statuses
    createdMessage: string
    saveStatus: Statuses
    savedMessage: string
    statusCode: 0 | 1 | 2


}

const initialState = {
    sourceData: null,
    createStatus: Statuses.IDLE,
    fetchStatus: Statuses.IDLE,
    saveStatus: Statuses.IDLE,
    createdMessage: '',
    savedMessage: '',
    statusCode: 2,

} as initialStateType

export const fetchSourceIndexData = createAsyncThunk(
    'fetch/srcdata',
    async (url: string, {rejectWithValue}) => {

        try {
            const {data} = await axios.get(url)
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })

export const createTemplatePage = createAsyncThunk(
    'create/temp',
    async (html: string, {rejectWithValue}) => {

        try {
            const {data} = await axios.post('./api/save-temp-page.php', {html})
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })


export const saveEdits = createAsyncThunk(
    'save/edits',
    async ({html, pagename}: { html: string, pagename: string }, {rejectWithValue}) => {

        try {

            const {data} = await axios.post('./api/save-edits.php', {html, pagename})
            await delay(1000)
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }

    })


const indexSourceSlice = createSlice({
    name: 'index/source',
    initialState,
    reducers: {},
    extraReducers(builder) {


        builder.addCase(fetchSourceIndexData.pending, (state) => {
            state.fetchStatus = Statuses.PENDING
            state.statusCode = 2
        }),

        builder.addCase(fetchSourceIndexData.fulfilled, (state, action: PayloadAction<string>) => {
           state.sourceData = action.payload
           state.fetchStatus = Statuses.RESOLVED
        }),

        builder.addCase(fetchSourceIndexData.rejected, (state) => {
             state.fetchStatus = Statuses.REJECTED

        }),




       builder.addCase(createTemplatePage.pending, (state) => {
           state.createStatus = Statuses.PENDING
           state.statusCode = 2
       }),

       builder.addCase(createTemplatePage.fulfilled, (state, action: PayloadAction<{ response: string, statusCode: 0 | 1 | 2 }>) => {
           state.createdMessage = action.payload.response
           state.createStatus = Statuses.RESOLVED
           state.statusCode = action.payload.statusCode
       }),

       builder.addCase(createTemplatePage.rejected, (state, action) => {
            state.createStatus = Statuses.REJECTED

       })



        builder.addCase(saveEdits.pending, (state) => {
            state.saveStatus = Statuses.PENDING
            state.savedMessage = 'Обновление...'
            state.statusCode = 2

        }),

       builder.addCase(saveEdits.fulfilled, (state, action: PayloadAction<{
           response: string,
           statusCode: 0 | 1 | 2
       }>) => {
            state.saveStatus = action.payload.statusCode === 0 ? Statuses.RESOLVED : Statuses.REJECTED
            state.savedMessage = action.payload.response
            state.statusCode = action.payload.statusCode
       }),

       builder.addCase(saveEdits.rejected, (state, action) => {
            state.saveStatus = Statuses.REJECTED
            state.savedMessage = action.error.name!


       })
    }
})
const selector = (state: AppRootState) => state
export const indexSrcSelector = createSelector(selector, (state) => state.indexSrc)


export default indexSourceSlice.reducer