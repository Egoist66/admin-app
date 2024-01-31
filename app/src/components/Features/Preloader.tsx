import { Backdrop, CircularProgress } from "@mui/material"
import React, { FC } from 'react'

export const Preloader: FC = () => {
    return (
        <Backdrop
            sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            style={{zIndex: 9999}}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}