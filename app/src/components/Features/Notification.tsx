import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { FC } from "react";
import { Statuses, setEditing } from "../../../store/app-ui-action-slice";
import { useAppDispatch } from "../../../store/store";

type NotificationProps = {
    status: Statuses
    message: string
}

export const Notification: FC<NotificationProps> = ({message, status}) => {
   const dispatch = useAppDispatch()

    return (
        
        <Snackbar
        
            open={status === Statuses.RESOLVED}
            onClose={() => dispatch(setEditing({status: Statuses.IDLE}))}
            message={message}
        
        >

        <Alert
            onClose={() => dispatch(setEditing({status: Statuses.IDLE}))}
            severity={status !== Statuses.ERROR ? 'success' : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>

    )
}