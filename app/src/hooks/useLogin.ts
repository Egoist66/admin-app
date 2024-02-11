import { log } from "console";
import { AuthAPI } from "../../api/service/auth-api";
import { setAuth, setLogin } from "../../store/app-auth-slice";
import { Statuses } from "../../store/app-ui-action-slice";
import { useAppDispatch } from "../../store/store";
import { delay } from "../utils/delay";
import { useState } from "react";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const [isBlocked, setBlock] = useState<boolean>(false)


    const checkAuth = () => {
        dispatch(setAuth({status: Statuses.LOADING}))

        AuthAPI.isAuth("./api/auth.php")
        .then((data) => {
            if(data.statusCode === 0){
                console.log(data);
                
                dispatch(
                    setAuth({
                    status: Statuses.RESOLVED,
                    isAuth: data.isAuth,
                    statusCode: data.statusCode,
                    })
                );
            }
            else {
                dispatch(
                    setAuth({
                    status: Statuses.ERROR,
                    isAuth: data.isAuth,
                    statusCode: data.statusCode,
                    })
                );
            }
        })
        .catch((e) => {
            console.log(e);

            
            dispatch(setLogin({
                status: Statuses.ERROR,
                statusCode: 1,
                response: 'Ошибка проверки авторизации'
            }))
        })
    };

    const login = async (password: string, afterLogin?: () => void) => {
        if(password.length >= 5){
            
            dispatch(setLogin({status: Statuses.LOADING}))

            await delay(1200)

            AuthAPI.login('./api/login.php', password)
                .then(data => {
                   if(data.statusCode === 0){
                        dispatch(setLogin({
                            status: data.status,
                            statusCode: data.statusCode,
                            response: data.response
                        }))

                        afterLogin ? afterLogin() : null
                    }
                    else {
                        console.log(data);
                        
                        dispatch(setLogin({
                            status: data.status,
                            statusCode: data.statusCode,
                            response: data.response
                        }))

                        if(data.isBlocked){
                            setBlock(true)
                        }
                       
                    }
                })
                .catch((e) => {
                    console.log(e);

                    dispatch(setLogin({
                        status: Statuses.ERROR,
                        statusCode: 1,
                        response: 'Ошибка логирования'
                    }))
                })
                .then(() => {
                    checkAuth()
                })
        }
    }
    
    
    const logout = () => {
        
        AuthAPI.logout(location.href + '/api/logout.php?action=logout')
        .then((data) => {
            if(data.loggedOut){
                console.info('Session stopped...', Date.now())
                dispatch(setAuth({status: Statuses.RESOLVED, statusCode: 0, isAuth: false}))
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }

  return {
    checkAuth,
    logout,
    setBlock,
    isBlocked,
    login
  };
};

