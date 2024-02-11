import { Box, Button, TextField } from "@mui/material";
import React, { FC } from "react";
import { useText } from "../../hooks/useText";
import { useToggle } from "../../hooks/useToggle";
import { useLogin } from "../../hooks/useLogin";

export const Login: FC = () => {
    const [value, setPassword] = useText('')
    const [isPassSpotted, setPassSpotted, togglePassSpotted] = useToggle()
    const {login} = useLogin()

    return (
        <div className="login-container">
            <div className="login">

                <Box gap={'20px'} display={'flex'} flexDirection={'column'}>
                        
                    <TextField 
                        onChange={setPassword}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                login(value)
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
                    <Button
                        onClick={() => login(value)} 
                        disabled={value.length < 5 || !value.length} 
                        color="info" 
                        variant="contained" 
                        type="button">Авторизоваться
                    </Button>
                </Box>

            </div>
        </div>
    )
}