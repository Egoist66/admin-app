import axios from "axios"
import { AuthStateType, LoginStateType } from "../../store/app-auth-slice"

export const AuthAPI = {

    async isAuth(url: string){
        const {data} = await axios.get<Omit<AuthStateType, 'status'>>(url)
        
        return data
    },

    async login(url: string, password: string){
        const {data} = await axios.post<LoginStateType & {isBlocked: boolean, time: number}>(url, {password})
        
        return data
    },


    async logout(url: string){
        const {data} = await axios.post<{loggedOut: boolean}>(url, {action: 'logout'})
        
        return data
    },
    
    
}