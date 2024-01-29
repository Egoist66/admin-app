import {useState} from "react";
import { delay } from "../utils/delay";

type useCatchUIState = {
    status: Statuses
    statusCode: 0 | 1
    response: string
    error: boolean
}

export enum Statuses {
    IDLE = "IDLE",
    LOADING = "LOADING",
    RESOLVED = "RESOLVED",
    ERROR = "ERROR"
}

export const useCatchUI = () => {
    const [state, setState] = useState<useCatchUIState>({
        statusCode: 0,
        status: Statuses.IDLE,
        response: '',
        error: false
    })

   
    const onLoad = async (status: Statuses, statusCode: 0 | 1, response: string = '') => {
       
        setState((state) => ({
            ...state,
            status,
            response,
            statusCode
        }));
    }

    const onError = async (status: Statuses, error: boolean) => {
       
        setState((state) => ({
            ...state,
            status,
            error
        }));
    }

    return {
        onLoad,
        onError,
        ...state
    }
}