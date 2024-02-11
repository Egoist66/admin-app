import { Box, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useText } from "../../hooks/useText";
import { useToggle } from "../../hooks/useToggle";
import { useLogin } from "../../hooks/useLogin";
import { useAppSelector } from "../../../store/store";
import {LoginSelector } from "../../../store/app-auth-slice";
import { Statuses } from "../../../store/app-ui-action-slice";

export const Login: FC = () => {
    const [value, setPassword, setPasswordValue] = useText('')
    const [isPassSpotted, _, togglePassSpotted] = useToggle()
    const {login, isBlocked} = useLogin()
    const {status, response, statusCode} = useAppSelector(LoginSelector)
 
    return (
        <div className="login-container">
            <div className="login">

                <Box gap={'20px'} display={'flex'} flexDirection={'column'}>
                        
                    <TextField
                        disabled={isBlocked} 
                        onChange={setPassword}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                login(value, () => {
                                    setPasswordValue('')
                                })
                            }
                        }}
                        onDoubleClick={togglePassSpotted}
                        value={value} 
                        required 
                        name="password" 
                        placeholder="Введите пароль не менее 5 символов" 
                        size="small" 
                        type={isPassSpotted ? 'text' : 'password'}
                    />
                    {response ? <p className="error-login" style={{color: statusCode === 1 ? 'red': 'rgb(2, 136, 209)'}}>{response}</p>: null}

                    <Button
                        onClick={() => login(value, () => setPasswordValue(''))} 
                        disabled={value.length < 5 || !value.length || status === Statuses.LOADING || isBlocked} 
                        color="info" 
                        variant="contained" 
                        type="button">{status === Statuses.LOADING ? 'Авторизация...' : 'Авторизоваться'}
                    </Button>

                </Box>

            </div>
        </div>
    )
}