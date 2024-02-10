import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "./store";

export enum Statuses {
    IDLE = "IDLE",
    LOADING = "LOADING",
    RESOLVED = "RESOLVED",
    ERROR = "ERROR"
}

type OperationStateType = {
    status: Statuses,
    statusCode?: 0 | 1,
    response?: string
}

type initialStateType = {
    app: {
        status: Statuses
    },
    editor: {
        editing: OperationStateType,
        deleting: OperationStateType
        creating: OperationStateType
        fetching: OperationStateType,
        template: OperationStateType,
        backup: OperationStateType,
        uploading: OperationStateType
    }
}

const initialState: initialStateType = {
    app: {
        status: Statuses.IDLE
    },
    editor: {
        creating: {response: '', statusCode: 0, status: Statuses.IDLE},
        deleting:{response: '', statusCode: 0, status: Statuses.IDLE},
        fetching: {response: '', statusCode: 0, status: Statuses.IDLE},
        editing: {response: '', statusCode: 0, status: Statuses.IDLE},
        template: {response: '', statusCode: 0, status: Statuses.IDLE},
        backup: {response: '', statusCode: 0, status: Statuses.IDLE},
        uploading: {response: '', statusCode: 0, status: Statuses.IDLE}
    
    }

} 


const AppUISlice = createSlice({
    name: 'app-ui-slice',
    initialState,
    reducers: {

        setApp(state, action: PayloadAction<Statuses>){
            state.app.status = action.payload
        },

        setCreating(state, action: PayloadAction<OperationStateType>){
            state.editor.creating = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setDeleting(state, action: PayloadAction<OperationStateType>){
            state.editor.deleting = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setFetching(state, action: PayloadAction<OperationStateType>){
            state.editor.fetching = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setEditing(state, action: PayloadAction<OperationStateType>){
            state.editor.editing = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setTemplate(state, action: PayloadAction<OperationStateType>){
            state.editor.template = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setBackup(state, action: PayloadAction<OperationStateType>){
            state.editor.backup = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        },

        setUpload(state, action: PayloadAction<OperationStateType>){
            state.editor.uploading = {
                response: action.payload.response,
                statusCode: action.payload.statusCode,
                status: action.payload.status
            }
        }
    }
})


export default AppUISlice.reducer
export const {
    setApp,
    setCreating,
    setDeleting,
    setFetching,
    setBackup,
    setUpload,
    setEditing,
    setTemplate
} = AppUISlice.actions

const selector = (state: AppRootState) => state.appUI.app
const selector2 = (state: AppRootState) => state.appUI.editor

export const appSelector = createSelector(selector, (state) => state)
export const editorSelector = createSelector(selector2, (state) => state)