import { log } from "console";
import { AuthAPI } from "../../api/service/auth-api";
import { setAuth } from "../../store/app-auth-slice";
import { Statuses } from "../../store/app-ui-action-slice";
import { useAppDispatch } from "../../store/store";

export const useLogin = () => {
  const dispatch = useAppDispatch();

    const checkAuth = () => {
        dispatch(setAuth({status: Statuses.LOADING}))

        AuthAPI.isAuth("./api/auth.php").then((data) => {
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
        });
    };

    const login = (password: string) => {
        if(password.length >= 5){
            
            AuthAPI.login('./api/login.php', password)
        }
    }

  return {
    checkAuth,
    login
  };
};
