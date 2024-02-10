import { Box, Button, TextField } from "@mui/material";
import React, { FC } from "react";

export const Login: FC = () => {
    return (
        <div className="login-container">
            <div className="login">

                <Box gap={'20px'} display={'flex'} flexDirection={'column'}>
                        
                    <TextField name="password" placeholder="Введите пароль" size="small" type="password" />
                    <Button color="info" variant="contained" type="button">Авторизоваться</Button>
                </Box>

            </div>
        </div>
    )
}