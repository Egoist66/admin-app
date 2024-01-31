import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { FC } from "react";
import { Statuses, setEditing } from "../../../store/app-ui-action-slice";
import { useAppDispatch } from "../../../store/store";

type NotificationProps = {
    status?: boolean
    message: string
    variant: "filled" | "standard" | "outlined"
    type: 'success' | 'error'
    onClose?: () => void
}

export const Notification: FC<NotificationProps> = ({message, onClose, status, type, variant}) => {

    return (
        
        <Snackbar
        
            open={status}
            onClose={onClose}
            message={message}
        
        >

        <Alert
            onClose={onClose}
            severity={type}
            variant={variant}
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>

    )
}